using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
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

            int sortOrder = customField.SortOrder ?? 0;

            if (!customField.SortOrder.HasValue)
            {
                IEnumerable<CustomField> customFields = await GetCustomFields();
                sortOrder = customFields.Last().SortOrder + 10;
            }

            CustomField newCustomField = new CustomField
            {
                Name = customField.Name.Trim(),
                FieldType = Enum.GetName(typeof(CustomFieldType), customField.Type),
                Required = customField.Required,
                SortOrder = sortOrder,
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

            int sortOrder = customField.SortOrder ?? 0;

            if (!customField.SortOrder.HasValue)
            {
                IEnumerable<CustomField> customFields = await GetCustomFields();
                sortOrder = customFields.Last().SortOrder + 10;
            }

            dbCustomField.Name = customField.Name.Trim();
            dbCustomField.FieldType = Enum.GetName(typeof(CustomFieldType), customField.Type);
            dbCustomField.Required = customField.Required;
            dbCustomField.SortOrder = sortOrder;
            dbCustomField.IsActive = customField.IsActive;
            dbCustomField.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbCustomField;
        }

        public async Task ReorderCustomFields(int sourceId, int targetId)
        {
            CustomField source = await GetCustomFieldById(sourceId);
            CustomField target = await GetCustomFieldById(targetId);
            bool movingUp = source.SortOrder > target.SortOrder;
            List<CustomField> customFields = await Context.CustomFields.Where(x => !x.IsDeleted && movingUp
                ? x.SortOrder >= target.SortOrder && x.SortOrder < source.SortOrder
                : x.SortOrder <= target.SortOrder && x.SortOrder > source.SortOrder).ToListAsync();

            source.SortOrder = target.SortOrder;

            foreach (CustomField customField in customFields)
            {
                customField.SortOrder = movingUp ? customField.SortOrder + 10 : customField.SortOrder - 10;
            }

            await Context.SaveChangesAsync();
        }
    }
}