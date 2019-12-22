using System.Collections.Generic;

namespace CandeeCamp.API.Models
{
    public enum ImportType
    {
        Cabins = 1,
        Coupons = 2,
    }
    
    public class FileUploadResponseModel
    {
        public string ContainerName { get; set; }

        public string Filename { get; set; }

        public List<string> Headers { get; set; }
    }

    public class BlobResponseModel
    {
        public bool Successful { get; set; }

        public string Error { get; set; }
        
        public string ContainerName { get; set; }

        public string Filename { get; set; }
    }

    public class ImportDataRequestModel
    {
        public ImportType ImportType { get; set; }
        
        public string Filename { get; set; }

        public string ContainerName { get; set; }

        public List<HeaderModel> Headers { get; set; }

        public int CreatedBy { get; set; }
    }

    public class HeaderModel
    {
        public string Header { get; set; }

        public string Value { get; set; }
    }

    public class ImportResponseModel
    {
        public List<ImportError> Errors { get; set; }
    }

    public class ImportError
    {
        public int LineNumber { get; set; }

        public string Message { get; set; }
    }
}