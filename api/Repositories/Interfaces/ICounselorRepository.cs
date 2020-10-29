using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICounselorRepository
    {
        Task<IEnumerable<Counselor>> GetCounselors(int portalId, CounselorFilterModel filters = null);
        Task<Counselor> GetCounselorById(int portalId, int counselorId);
        Task<Counselor> CreateCounselor(int portalId, CounselorModel counselor);
        Task DeleteCounselor(int portalId, int counselorId);
        Task<Counselor> UpdateCounselor(int portalId, int counselorId, CounselorModel counselor);
    }
}