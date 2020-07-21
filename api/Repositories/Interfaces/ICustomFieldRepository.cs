using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICustomFieldRepository
    {
        Task<IEnumerable<CustomField>> GetCustomFields(int portalId);
        Task<CustomField> GetCustomFieldById(int portalId, int customFieldId);
        Task<IEnumerable<CustomField>> GetCustomFieldsByName(int portalId, string name);
        Task<CustomField> CreateCustomField(int portalId, CustomFieldModel customField);
        Task DeleteCustomField(int portalId, int customFieldId);
        Task<CustomField> UpdateCustomField(int portalId, int customFieldId, CustomFieldModel customField);
        Task ReorderCustomFields(int portalId, int sourceId, int targetId);
    }
}