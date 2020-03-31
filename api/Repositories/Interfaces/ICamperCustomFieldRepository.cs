using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICamperCustomFieldRepository
    {
        Task<IEnumerable<CamperCustomField>> GetCamperCustomFields(int camperId);
        Task<CamperCustomField> GetCamperCustomField(int camperId, int customFieldId);
        Task<CamperCustomField> SaveCamperCustomField(int camperId, int customFieldId, string value);
    }
}