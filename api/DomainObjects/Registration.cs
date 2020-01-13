using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Registration : ActiveDeleted
    {
        public Registration()
        {
            RegistrationDate = DateTimeOffset.UtcNow;
        }

        public DateTimeOffset RegistrationDate { get; set; }

        public decimal StartingBalance { get; set; }

        public DateTimeOffset? CheckInDate { get; set; }

        public DateTimeOffset? CheckOutDate { get; set; }

        public int EventId { get; set; }

        [ForeignKey("Id")]
        public virtual Event Event { get; set; }

        public int CamperId { get; set; }

        [ForeignKey("Id")]
        public virtual Camper Camper { get; set; }
    }
}