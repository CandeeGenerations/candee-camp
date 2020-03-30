using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICustomFieldRepository
    {
        Task<IEnumerable<CustomField>> GetCustomFields();
        Task<CustomField> GetCustomFieldById(int customFieldId);
        Task<IEnumerable<CustomField>> GetCustomFieldsByName(string name);
        Task<CustomField> CreateCustomField(CustomFieldModel customField);
        Task DeleteCustomField(int customFieldId);
        Task<CustomField> UpdateCustomField(int customFieldId, CustomFieldModel customField);
        Task ReorderCustomFields(int sourceId, int targetId);
    }
}