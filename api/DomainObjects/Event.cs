using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class Event : ActiveDeleted
    {
        public Event()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        [Required]
        public string Name { get; set; }

        public decimal? Cost { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public int? CreatedBy { get; set; }
        
        [ForeignKey("Id")]
        public virtual User User { get; set; }
        
        public int PortalId { get; set; }

        [ForeignKey("Id")]
        public virtual Portal Portal { get; set; }
    }
}