using System;
using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
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
        
        public int PortalId { get; set; }

        [ForeignKey("Id")]
        public virtual Portal Portal { get; set; }
    }
}