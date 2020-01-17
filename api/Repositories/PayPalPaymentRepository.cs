using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;

namespace CandeeCamp.API.Repositories
{
    public class PayPalPaymentRepository : BaseRepository, IPayPalPaymentRepository
    {
        public PayPalPaymentRepository(CampContext context) : base(context)
        {
        }

        public async Task<PayPal_Payment> CreatePayment(PayPalPaymentModel payment, int paymentDonationId)
        {
            PayPal_Payment newPayPalPayment = new PayPal_Payment
            {
                Status = payment.Status,
                CreateDate = payment.CreatedDate,
                EmailAddress = payment.EmailAddress,
                PayerId = payment.PayerId,
                PayPalId = payment.PayPalId,
                PaymentDonationId = paymentDonationId
            };

            await Context.PayPal_Payments.AddAsync(newPayPalPayment);
            await Context.SaveChangesAsync();

            return newPayPalPayment;
        }
    }
}