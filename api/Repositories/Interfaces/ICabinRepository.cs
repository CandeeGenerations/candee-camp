using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICabinRepository
    {
        Task<IEnumerable<Cabin>> GetCabins();
        Task<Cabin> GetCabinById(int cabinId);
        Task<IEnumerable<Cabin>> GetCabinsByName(string name);
        Task<Cabin> CreateCabin(CabinModel cabin);
        Task DeleteCabin(int cabinId);
        Task<Cabin> UpdateCabin(int cabinId, CabinModel cabin);
    }
}