using System;

namespace Reclaimed.API.Models
{
    public enum PaymentType {
        Payment = 0,
        Donation = 1
    }

    public enum PaymentProcessor
    {
        PayPal = 0
    }

    public class PaymentDonationModel
    {
        public PaymentType Type { get; set; }
        
        public decimal Amount { get; set; }

        public PaymentProcessor Processor { get; set; }
    }
    
    public class PayPalPaymentModel : PaymentDonationModel
    {
        public string PayPalId { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string Status { get; set; }

        public string EmailAddress { get; set; }

        public string PayerId { get; set; }
    }
}