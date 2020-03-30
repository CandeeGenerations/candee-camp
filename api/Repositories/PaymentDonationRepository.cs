using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class PaymentDonationRepository : BaseRepository, IPaymentDonationRepository
    {
        public PaymentDonationRepository(CampContext context) : base(context)
        {
        }

        public async Task<Payment_Donation> GetPaymentDonationById(int paymentDonationId)
        {
            Payment_Donation dbPaymentDonation =
                await Context.Payments_Donations.FirstOrDefaultAsync(x => x.Id == paymentDonationId && !x.IsDeleted);

            if (dbPaymentDonation == null)
            {
                throw new Exception("This payment or donation does not exist.");
            }

            return dbPaymentDonation;
        }

        public async Task<Payment_Donation> CreatePaymentDonation(PaymentDonationModel paymentDonation)
        {
            Payment_Donation newPaymentDonation = new Payment_Donation
            {
                Amount = paymentDonation.Amount,
                Processor = Enum.GetName(typeof(PaymentProcessor), paymentDonation.Processor),
                Type = Enum.GetName(typeof(PaymentType), paymentDonation.Type),
                CreatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false
            };

            await Context.Payments_Donations.AddAsync(newPaymentDonation);
            await Context.SaveChangesAsync();

            return newPaymentDonation;
        }

        public async Task<Payment_Donation> UpdatePaymentDonation(int paymentDonationId,
            PaymentDonationModel paymentDonation)
        {
            Payment_Donation dbPaymentDonation = await GetPaymentDonationById(paymentDonationId);

            dbPaymentDonation.Amount = paymentDonation.Amount;
            dbPaymentDonation.Processor = Enum.GetName(typeof(PaymentProcessor), paymentDonation.Processor);
            dbPaymentDonation.Type = Enum.GetName(typeof(PaymentType), paymentDonation.Type);

            await Context.SaveChangesAsync();

            return dbPaymentDonation;
        }

        public async Task AddRegistrationPayment(int paymentDonationId, int registrationId)
        {
            await Context.RegistrationPayments.AddAsync(new RegistrationPayment
                {PaymentDonationId = paymentDonationId, RegistrationId = registrationId});
            await Context.SaveChangesAsync();
        }

        public async Task AddUserPayment(int paymentDonationId, int userId)
        {
            await Context.UserPayments.AddAsync(
                new UserPayment {PaymentDonationId = paymentDonationId, UserId = userId});
            await Context.SaveChangesAsync();
        }
    }
}