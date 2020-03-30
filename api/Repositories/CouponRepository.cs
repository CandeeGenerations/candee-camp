using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class CouponRepository : BaseRepository, ICouponRepository
    {
        public CouponRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Coupon>> GetCoupons() =>
            await Context.Coupons.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Coupon> GetCouponById(int couponId)
        {
            Coupon dbCoupon = await Context.Coupons.FirstOrDefaultAsync(x => x.Id == couponId && !x.IsDeleted);

            if (dbCoupon == null)
            {
                throw new Exception("This coupon does not exist.");
            }

            return dbCoupon;
        }

        public async Task<IEnumerable<Coupon>> GetCouponsByName(string name) => await Context.Coupons
            .Where(x => !x.IsDeleted && string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<IEnumerable<Coupon>> GetCouponsByCode(string code) => await Context.Coupons
            .Where(x => !x.IsDeleted && string.Equals(x.Code, code.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<Coupon> CreateCoupon(CouponModel coupon)
        {
            IEnumerable<Coupon> existingCoupons = await GetCouponsByName(coupon.Name);

            if (existingCoupons.Any())
            {
                throw new Exception("This coupon already exists. Please use another name.");
            }
            
            existingCoupons = await GetCouponsByCode(coupon.Code);

            if (existingCoupons.Any())
            {
                throw new Exception("This coupon already exists. Please use another code.");
            }

            Coupon newCoupon = new Coupon
            {
                Name = coupon.Name.Trim(),
                Code = coupon.Code.Trim(),
                CreatedBy = coupon.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                ExpirationDate = coupon.ExpirationDate,
                IsActive = true,
                IsDeleted = false
            };

            await Context.Coupons.AddAsync(newCoupon);
            await Context.SaveChangesAsync();

            return newCoupon;
        }

        public async Task DeleteCoupon(int couponId)
        {
            Coupon dbCoupon = await GetCouponById(couponId);

            dbCoupon.IsActive = false;
            dbCoupon.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Coupon> UpdateCoupon(int couponId, CouponModel coupon)
        {
            Coupon dbCoupon = await GetCouponById(couponId);

            if (!string.Equals(dbCoupon.Name, coupon.Name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<Coupon> existingCoupons = await GetCouponsByName(coupon.Name);

                if (existingCoupons.Any())
                {
                    throw new Exception("This coupon already exists. Please use another name.");
                }
            }

            if (!string.Equals(dbCoupon.Code, coupon.Code.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<Coupon> existingCoupons = await GetCouponsByCode(coupon.Code);

                if (existingCoupons.Any())
                {
                    throw new Exception("This coupon already exists. Please use another code.");
                }
            }

            dbCoupon.Name = coupon.Name.Trim();
            dbCoupon.Code = coupon.Code.Trim();
            dbCoupon.ExpirationDate = coupon.ExpirationDate;
            dbCoupon.IsActive = coupon.IsActive;
            dbCoupon.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbCoupon;
        }
    }
}