using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Reclaimed.API.Common;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Controllers
{
    // https://github.com/shahedc/SimpleUpload
    [ApiVersion("1.0")]
    [Authorize(Policy = CampPolicies.Portal)]
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private readonly IConfiguration _config;
        private readonly ICabinRepository _cabinRepository;
        private readonly ICouponRepository _couponRepository;

        public FileController(IConfiguration config, ICouponRepository couponRepository,
            ICabinRepository cabinRepository)
        {
            _config = config;
            _couponRepository = couponRepository;
            _cabinRepository = cabinRepository;
        }

        [HttpPost("upload")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadImportFile(IFormFile file, int userId, ImportType importType)
        {
            List<string> headers = new List<string>();
            BlobResponseModel blobResponseModel;
            
            if (file.Length <= 0)
            {
                return BadRequest("The file is empty.");
            }

            await using (Stream stream = file.OpenReadStream())
            {
                blobResponseModel =
                    await UploadToBlob(
                        $"import-{Enum.GetName(typeof(ImportType), importType)?.ToLower()}-{(userId == -1 ? 0 : userId)}-{Guid.NewGuid()}",
                        file.FileName, stream);
            }

            if (!blobResponseModel.Successful)
            {
                return BadRequest($"There was an error importing your data: {blobResponseModel.Error}");
            }

            await using (Stream stream = file.OpenReadStream())
            {
                using StreamReader reader = new StreamReader(stream);
                string columnHeaders = reader.ReadLine();
                    
                if (columnHeaders != null)
                {
                    headers = columnHeaders.Split(',').ToList();
                }
            }

            FileUploadResponseModel response = new FileUploadResponseModel
            {
                ContainerName = blobResponseModel.ContainerName,
                Filename = blobResponseModel.Filename,
                Headers = headers
            };

            return Ok(response);
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportData([FromBody] ImportDataRequestModel model)
        {
            try
            {
                string storageConnectionString = _config["ConnectionStrings:AzureStorageConnection"];

                // Check whether the connection string can be parsed.
                if (!CloudStorageAccount.TryParse(storageConnectionString, out CloudStorageAccount storageAccount))
                {
                    throw new Exception("Storage account connection issue.");
                }

                // Create the CloudBlobClient that represents the Blob storage endpoint for the storage account.
                CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = cloudBlobClient.GetContainerReference(model.ContainerName);
                CloudBlob blob = container.GetBlobReference(model.Filename);
                Dictionary<int, string> headers = new Dictionary<int, string>();
                Dictionary<int, string> errors = new Dictionary<int, string>();
                int lineNumber = 0;

                await using (Stream stream = await blob.OpenReadAsync())
                {
                    using StreamReader reader = new StreamReader(stream);
                    while (!reader.EndOfStream)
                    {
                        string line = reader.ReadLine();

                        if (line == null)
                        {
                            continue;
                        }

                        string[] cols = line.Split(',');

                        if (lineNumber == 0)
                        {
                            // set headers
                            for (int i = 0; i < cols.Length; i++)
                            {
                                headers.Add(i, cols[i]);
                            }
                        }
                        else
                        {
                            try
                            {
                                // import data
                                switch (model.ImportType)
                                {
                                    case ImportType.Cabins:
                                        CabinModel cabinModel = new CabinModel
                                        {
                                            Name = GetColumnValue(model.Headers, headers, cols, "Name"),
                                            CreatedBy = model.CreatedBy,
                                            IsActive = true
                                        };

                                        await _cabinRepository.CreateCabin(cabinModel);
                                        
                                        break;

                                    case ImportType.Coupons:
                                        string expirationDateValue = GetColumnValue(model.Headers, headers, cols,
                                            "ExpirationDate");
                                        DateTimeOffset? expirationDate = null;

                                        if (expirationDateValue != null)
                                        {
                                            DateTimeOffset.TryParse(expirationDateValue,
                                                out DateTimeOffset actualExpirationDate);
                                            
                                            expirationDate = actualExpirationDate;
                                        }

                                        CouponModel couponModel = new CouponModel
                                        {
                                            Name = GetColumnValue(model.Headers, headers, cols, "Name"),
                                            Code = GetColumnValue(model.Headers, headers, cols, "Code"),
                                            ExpirationDate = expirationDate,
                                            CreatedBy = model.CreatedBy,
                                            IsActive = true
                                        };

                                        await _couponRepository.CreateCoupon(couponModel);
                                        
                                        break;

                                    default:
                                        throw new ArgumentException("The import type is required.");
                                }
                            }
                            catch (Exception ex)
                            {
                                errors.Add(lineNumber, ex.Message);
                            }
                        }

                        lineNumber++;
                    }
                }

                List<ImportError> importErrors = new List<ImportError>();

                if (errors.Any())
                {
                    importErrors.AddRange(errors.Select(error => new ImportError
                        {LineNumber = error.Key, Message = error.Value}));
                }
                else
                {
                    await container.DeleteAsync();
                }

                return Ok(new ImportResponseModel
                {
                    Errors = importErrors
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private static string GetColumnValue(IEnumerable<HeaderModel> headerModels, Dictionary<int, string> headers,
            IReadOnlyList<string> data, string headerName)
        {
            HeaderModel header = headerModels.FirstOrDefault(x => x.Header == headerName);

            if (header == null)
            {
                return null;
            }

            KeyValuePair<int, string>? headerIndex = headers.Where(x => x.Value == header.Value)
                .Select(x => (KeyValuePair<int, string>?) x)
                .FirstOrDefault();

            return headerIndex == null ? null : data[headerIndex.Value.Key];
        }

        private async Task<BlobResponseModel> UploadToBlob(string containerName, string filename, Stream stream = null)
        {
            BlobResponseModel responseModel = new BlobResponseModel();
            string storageConnectionString = _config["ConnectionStrings:AzureStorageConnection"];

            // Check whether the connection string can be parsed.
            if (!CloudStorageAccount.TryParse(storageConnectionString, out CloudStorageAccount storageAccount))
            {
                responseModel.Successful = false;
                responseModel.Error = "Storage account connection issue.";

                return responseModel;
            }
            
            try
            {
                // Create the CloudBlobClient that represents the Blob storage endpoint for the storage account.
                CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();

                // Create a container called 'uploadblob' and append a GUID value to it to make the name unique.
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(containerName);
                await cloudBlobContainer.CreateIfNotExistsAsync();

                // Set the permissions so the blobs are public. 
                BlobContainerPermissions permissions = new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Blob
                };
                await cloudBlobContainer.SetPermissionsAsync(permissions);

                // Get a reference to the blob address, then upload the file to the blob.
                CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(filename);

                if (stream != null)
                {
                    await cloudBlockBlob.UploadFromStreamAsync(stream);
                } else
                {
                    responseModel.Successful = false;
                    responseModel.Error = "No Stream.";

                    return responseModel;
                }

                responseModel.Successful = true;
                responseModel.ContainerName = containerName;
                responseModel.Filename = filename;

                return responseModel;
            }
            catch (StorageException ex)
            {
                responseModel.Successful = false;
                responseModel.Error = ex.Message;
                
                return responseModel;
            }
        }
    }
}