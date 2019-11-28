using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface ICamperRepository
    {
        Task<IEnumerable<Camper>> GetCampers();
        Task<IEnumerable<Camper>> GetCampersByGroup(int groupId);
        Task<Camper> GetCamperById(int camperId);
        Task<Camper> CreateCamper(CamperModel camper);
        Task DeleteCamper(int camperId);
        Task<Camper> UpdateCamper(int camperId, CamperModel camper);
        Task UpdateGroups(int[] camperIds, int groupId);
        Task RemoveGroups(int groupId);
    }
} 