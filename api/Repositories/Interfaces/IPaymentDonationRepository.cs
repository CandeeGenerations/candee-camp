using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
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