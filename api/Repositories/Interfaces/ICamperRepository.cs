using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICamperRepository
    {
        Task<IEnumerable<Camper>> GetCampers(int portalId, CamperFilterModel filters = null);
        Task<IEnumerable<Camper>> GetCampersByIds(int portalId, IEnumerable<int> userIds);
        Task<IEnumerable<Camper>> GetCampersForRegistration(int portalId, int? currentCamperId);
        Task<IEnumerable<Camper>> GetCampersByGroup(int portalId, int groupId);
        Task<Camper> GetCamperById(int portalId, int camperId);
        Task<Camper> CreateCamper(int portalId, CamperModel camper);
        Task DeleteCamper(int portalId, int camperId);
        Task<Camper> UpdateCamper(int portalId, int camperId, CamperModel camper);
        Task UpdateGroups(int portalId, int[] camperIds, int groupId);
        Task RemoveGroups(int portalId, int groupId);
    }
}