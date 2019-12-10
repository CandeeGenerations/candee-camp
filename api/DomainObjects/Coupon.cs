using System;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Coupon : ActiveDeleted
    {
        public Coupon()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        public string Name { get; set; }

        public string Code { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public DateTimeOffset? ExpirationDate { get; set; }

        public int CreatedBy { get; set; }

        [ForeignKey("Id")]
        public virtual User CreatedByUser { get; set; }
    }
}