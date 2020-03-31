using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class UserPayment : PrimaryId
    {
        public int PaymentDonationId { get; set; }

        [ForeignKey("Id")]
        public virtual Payment_Donation PaymentDonation { get; set; }

        public int UserId { get; set; }

        [ForeignKey("Id")]
        public virtual User User { get; set; }
    }
}