using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IPayPalPaymentRepository
    {
        Task<PayPal_Payment> CreatePayment(PayPalPaymentModel payment, int paymentDonationId);
    }
}