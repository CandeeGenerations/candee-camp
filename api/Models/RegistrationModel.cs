using System;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Models
{
    public class RegistrationModel
    {
        public int StartingBalance { get; set; }

        public DateTimeOffset? CheckInDate { get; set; }

        public DateTimeOffset? CheckOutDate { get; set; }

        public bool IsActive { get; set; }

        public int CamperId { get; set; }
        
        public int EventId { get; set; }

        public Event Event { get; set; }
    }
}