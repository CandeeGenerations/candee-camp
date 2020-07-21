using System;
using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class RedeemedCoupon : PrimaryId
    {
        public RedeemedCoupon()
        {
            RedeemedDate = DateTimeOffset.UtcNow;
        }
        
        public DateTimeOffset RedeemedDate { get; set; }

        public int CouponId { get; set; }

        [ForeignKey("Id")]
        public virtual Coupon Coupon { get; set; }

        public int CamperId { get; set; }

        [ForeignKey("Id")]
        public virtual Camper Camper { get; set; }
    }
}