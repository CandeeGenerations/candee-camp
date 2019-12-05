using System;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Counselor : ActiveDeleted
    {
        public Counselor()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public decimal StartingBalance { get; set; }

        public DateTimeOffset CreatedDate { get; set; }
        
        public DateTimeOffset UpdatedDate { get; set; }

        public int UserId { get; set; }

        [ForeignKey("Id")]
        public virtual User User { get; set; }
        
        public int CreatedBy { get; set; }
        
        [ForeignKey("CreatedBy")]
        public virtual User CreatedByUser { get; set; }

        public int? CabinId { get; set; }

        [ForeignKey("Id")]
        public virtual Cabin Cabin { get; set; }
    }
}