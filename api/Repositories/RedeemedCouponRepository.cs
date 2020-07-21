using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class RedeemedCouponRepository : BaseRepository, IRedeemedCouponRepository
    {
        public RedeemedCouponRepository(CampContext context) : base(context)
        {
        }

        public async Task<RedeemedCoupon> GetCamperCoupon(int camperId) =>
            await Context.RedeemedCoupons.FirstOrDefaultAsync(x => x.CamperId == camperId);

        public async Task<RedeemedCoupon> RedeemCoupon(int couponId, int camperId)
        {
            RedeemedCoupon camperCoupon = await GetCamperCoupon(camperId);

            if (camperCoupon == null)
            {
                RedeemedCoupon newCamperCoupon = new RedeemedCoupon
                {
                    CamperId = camperId,
                    CouponId = couponId,
                    RedeemedDate = DateTimeOffset.Now,
                };

                await Context.RedeemedCoupons.AddAsync(newCamperCoupon);
                await Context.SaveChangesAsync();

                return newCamperCoupon;
            }

            camperCoupon.CouponId = couponId;
            camperCoupon.RedeemedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return camperCoupon;
        }

        public async Task RemoveRedeemedCoupon(int camperId)
        {
            RedeemedCoupon camperCoupon = await GetCamperCoupon(camperId);

            Context.Remove(camperCoupon);
            await Context.SaveChangesAsync();
        }
    }
}