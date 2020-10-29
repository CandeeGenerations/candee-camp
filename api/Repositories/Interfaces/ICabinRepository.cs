using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICabinRepository
    {
        Task<IEnumerable<Cabin>> GetCabins(int portalId, ActiveFilterModel filters = null);
        Task<Cabin> GetCabinById(int portalId, int cabinId);
        Task<IEnumerable<Cabin>> GetCabinsByName(int portalId, string name);
        Task<Cabin> CreateCabin(int portalId, CabinModel cabin);
        Task DeleteCabin(int portalId, int cabinId);
        Task<Cabin> UpdateCabin(int portalId, int cabinId, CabinModel cabin);
    }
}