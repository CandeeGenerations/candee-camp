using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IRedeemedCouponRepository
    {
        Task<RedeemedCoupon> GetCamperCoupon(int camperId);
        Task<RedeemedCoupon> RedeemCoupon(int couponId, int camperId);
        Task RemoveRedeemedCoupon(int camperId);
    }
}