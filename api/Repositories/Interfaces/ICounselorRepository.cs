using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICounselorRepository
    {
        Task<IEnumerable<Counselor>> GetCounselors();
        Task<Counselor> GetCounselorById(int counselorId);
        Task<Counselor> CreateCounselor(CounselorModel counselor);
        Task DeleteCounselor(int counselorId);
        Task<Counselor> UpdateCounselor(int counselorId, CounselorModel counselor);
    }
}