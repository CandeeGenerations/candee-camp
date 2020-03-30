using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reclaimed.API.Common;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(Policy = CampPolicies.Registrations)]
    [Route("api/payments/paypal")]
    [Produces("application/json")]
    public class PayPalPaymentsController : Controller
    {
        private readonly IPayPalPaymentRepository _payPalPaymentRepository;
        private readonly IPaymentDonationRepository _paymentDonationRepository;

        public PayPalPaymentsController(IPayPalPaymentRepository payPalPaymentRepository,
            IPaymentDonationRepository paymentDonationRepository)
        {
            _payPalPaymentRepository = payPalPaymentRepository;
            _paymentDonationRepository = paymentDonationRepository;
        }

        [HttpPost]
        [ProducesResponseType(typeof(PayPal_Payment), 200)]
        public async Task<ActionResult<PayPal_Payment>> CreateGroup([FromBody]PayPalPaymentModel payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaymentDonationModel newPaymentDonation = new PaymentDonationModel
            {
                Amount = payment.Amount,
                Processor = payment.Processor,
                Type = payment.Type
            };

            Payment_Donation paymentDonation =
                await _paymentDonationRepository.CreatePaymentDonation(newPaymentDonation);
            PayPal_Payment payPayPayment = await _payPalPaymentRepository.CreatePayment(payment, paymentDonation.Id);

            return Ok(payPayPayment);
        }
    }
}