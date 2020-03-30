using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ICouponRepository
    {
        Task<IEnumerable<Coupon>> GetCoupons();
        Task<Coupon> GetCouponById(int couponId);
        Task<IEnumerable<Coupon>> GetCouponsByName(string name);
        Task<IEnumerable<Coupon>> GetCouponsByCode(string code);
        Task<Coupon> CreateCoupon(CouponModel coupon);
        Task DeleteCoupon(int couponId);
        Task<Coupon> UpdateCoupon(int couponId, CouponModel coupon);
    }
}