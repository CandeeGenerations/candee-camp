using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICamperRepository
    {
        Task<IEnumerable<Camper>> GetCampers();
        Task<IEnumerable<Camper>> GetCampersByIds(IEnumerable<int> userIds);
        Task<IEnumerable<Camper>> GetCampersForRegistration(int? currentCamperId);
        Task<IEnumerable<Camper>> GetCampersByGroup(int groupId);
        Task<Camper> GetCamperById(int camperId);
        Task<Camper> CreateCamper(CamperModel camper);
        Task DeleteCamper(int camperId);
        Task<Camper> UpdateCamper(int camperId, CamperModel camper);
        Task UpdateGroups(int[] camperIds, int groupId);
        Task RemoveGroups(int groupId);
    }
} 