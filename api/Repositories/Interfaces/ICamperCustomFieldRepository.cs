using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface ICamperCustomFieldRepository
    {
        Task<IEnumerable<CamperCustomField>> GetCamperCustomFields(int camperId);
        Task<CamperCustomField> GetCamperCustomField(int camperId, int customFieldId);
        Task<CamperCustomField> SaveCamperCustomField(int camperId, int customFieldId, string value);
    }
}