using System.Threading.Tasks;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
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