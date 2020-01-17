using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Payment_Donation : ActiveDeleted
    {
        public Payment_Donation()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        [Required]
        public string Type { get; set; }

        public decimal Amount { get; set; }

        public string Processor { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public int? UserId { get; set; }
        
        [ForeignKey("Id")]
        public virtual User User { get; set; }

        public int? RegistrationId { get; set; }
        
        [ForeignKey("Id")]
        public virtual Registration Registration { get; set; }
    }
}