using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IPaymentDonationRepository
    {
        Task<Payment_Donation> GetPaymentDonationById(int paymentDonationId);
        Task<Payment_Donation> CreatePaymentDonation(PaymentDonationModel paymentDonation);
        Task<Payment_Donation> UpdatePaymentDonation(int paymentDonationId, PaymentDonationModel paymentDonation);
        Task AddRegistrationPayment(int paymentDonationId, int registrationId);
        Task AddUserPayment(int paymentDonationId, int userId);
    }
}