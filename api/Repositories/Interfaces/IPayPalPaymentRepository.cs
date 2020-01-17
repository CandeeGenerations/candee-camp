using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IPayPalPaymentRepository
    {
        Task<PayPal_Payment> CreatePayment(PayPalPaymentModel payment, int paymentDonationId);
    }
}