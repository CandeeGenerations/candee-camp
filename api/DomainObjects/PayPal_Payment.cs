using System;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class PayPal_Payment : PrimaryId
    {
        public string PayPalId { get; set; }

        public DateTimeOffset CreateDate { get; set; }

        public string Status { get; set; }

        public string EmailAddress { get; set; }

        public string PayerId { get; set; }
        
        public int? PaymentDonationId { get; set; }
        
        [ForeignKey("Id")]
        public virtual Payment_Donation PaymentDonation { get; set; }
    }
}