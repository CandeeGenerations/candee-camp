using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface ICounselorRepository
    {
        Task<IEnumerable<Counselor>> GetCounselors();
    }
}