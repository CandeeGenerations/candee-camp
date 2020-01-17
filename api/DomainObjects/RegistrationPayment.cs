using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class RegistrationPayment : PrimaryId
    {
        public int PaymentDonationId { get; set; }

        [ForeignKey("Id")]
        public virtual Payment_Donation PaymentDonation { get; set; }

        public int RegistrationId { get; set; }

        [ForeignKey("Id")]
        public virtual Registration Registration { get; set; }
    }
}