using System;
using System.ComponentModel.DataAnnotations;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
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
        
        public virtual User CreatedBy { get; set; }
    }
}