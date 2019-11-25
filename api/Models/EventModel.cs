using System;
using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    public class EventModel
    {
        [Required]
        public string Name { get; set; }

        public decimal? Cost { get; set; }

        [Required]
        public DateTimeOffset StartDate { get; set; }

        [Required]
        public DateTimeOffset EndDate { get; set; }
        
        public bool IsActive { get; set; }

        public int CreatedBy { get; set; }
    }
}