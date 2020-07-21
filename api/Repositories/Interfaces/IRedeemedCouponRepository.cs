using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IRedeemedCouponRepository
    {
        Task<RedeemedCoupon> GetCamperCoupon(int camperId);
        Task<RedeemedCoupon> RedeemCoupon(int couponId, int camperId);
        Task RemoveRedeemedCoupon(int camperId);
    }
}