using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class CustomFieldRepository : BaseRepository, ICustomFieldRepository
    {
        public CustomFieldRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CustomField>> GetCustomFields() =>
            await Context.CustomFields.Where(x => !x.IsDeleted).OrderBy(x => x.SortOrder).ToListAsync();

        public async Task<CustomField> GetCustomFieldById(int customFieldId)
        {
            CustomField dbCustomField =
                await Context.CustomFields.FirstOrDefaultAsync(x => x.Id == customFieldId && !x.IsDeleted);

            if (dbCustomField == null)
            {
                throw new Exception("This custom field does not exist.");
            }

            return dbCustomField;
        }

        public async Task<IEnumerable<CustomField>> GetCustomFieldsByName(string name) => await Context.CustomFields
            .Where(x => !x.IsDeleted && string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .OrderBy(x => x.SortOrder)
            .ToListAsync();

        public async Task<CustomField> CreateCustomField(CustomFieldModel customField)
        {
            IEnumerable<CustomField> existingCustomFields = await GetCustomFieldsByName(customField.Name);

            if (existingCustomFields.Any())
            {
                throw new Exception("This custom field already exists. Please use another name.");
            }

            CustomField newCustomField = new CustomField
            {
                Name = customField.Name.Trim(),
                FieldType = Enum.GetName(typeof(CustomFieldType), customField.Type),
                Required = customField.Required,
                SortOrder = customField.SortOrder,
                CreatedBy = customField.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false
            };

            await Context.CustomFields.AddAsync(newCustomField);
            await Context.SaveChangesAsync();

            return newCustomField;
        }

        public async Task DeleteCustomField(int customFieldId)
        {
            CustomField dbCustomField = await GetCustomFieldById(customFieldId);

            dbCustomField.IsActive = false;
            dbCustomField.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<CustomField> UpdateCustomField(int customFieldId, CustomFieldModel customField)
        {
            CustomField dbCustomField = await GetCustomFieldById(customFieldId);

            if (!string.Equals(dbCustomField.Name, customField.Name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<CustomField> existingCustomFields = await GetCustomFieldsByName(customField.Name);

                if (existingCustomFields.Any())
                {
                    throw new Exception("This custom field already exists. Please use another name.");
                }
            }

            dbCustomField.Name = customField.Name.Trim();
            dbCustomField.FieldType = Enum.GetName(typeof(CustomFieldType), customField.Type);
            dbCustomField.Required = customField.Required;
            dbCustomField.SortOrder = customField.SortOrder;
            dbCustomField.IsActive = customField.IsActive;
            dbCustomField.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbCustomField;
        }
    }
}