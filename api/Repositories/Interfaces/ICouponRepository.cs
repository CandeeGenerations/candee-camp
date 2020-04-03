using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICouponRepository
    {
        Task<IEnumerable<Coupon>> GetCoupons(int portalId);
        Task<Coupon> GetCouponById(int portalId, int couponId);
        Task<IEnumerable<Coupon>> GetCouponsByName(int portalId, string name);
        Task<IEnumerable<Coupon>> GetCouponsByCode(int portalId, string code);
        Task<Coupon> CreateCoupon(int portalId, CouponModel coupon);
        Task DeleteCoupon(int portalId, int couponId);
        Task<Coupon> UpdateCoupon(int portalId, int couponId, CouponModel coupon);
    }
}