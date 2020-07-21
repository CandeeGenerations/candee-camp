using System;
using Reclaimed.API.DomainObjects;

namespace Reclaimed.API.Models
{
    public class RegistrationModel
    {
        public decimal StartingBalance { get; set; }

        public DateTimeOffset? CheckInDate { get; set; }

        public DateTimeOffset? CheckOutDate { get; set; }

        public bool IsActive { get; set; }

        public int CamperId { get; set; }
        
        public int EventId { get; set; }

        public Event Event { get; set; }
    }
}