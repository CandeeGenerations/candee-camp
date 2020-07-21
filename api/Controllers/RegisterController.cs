using System;
using System.Collections.Generic;
using System.Linq;
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
    [Authorize(Policy = CampPolicies.SamePortal)]
    [Route("api/{portalId}/[controller]")]
    [Produces("application/json")]
    public class RegisterController : Controller
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IEventRepository _eventRepository;
        private readonly ICamperRepository _camperRepository;
        private readonly ICouponRepository _couponRepository;
        private readonly ICustomFieldRepository _customFieldRepository;
        private readonly IRegistrationRepository _registrationRepository;
        private readonly IRedeemedCouponRepository _redeemedCouponRepository;
        private readonly IPaymentDonationRepository _paymentDonationRepository;
        private readonly ICamperCustomFieldRepository _camperCustomFieldRepository;

        public RegisterController(IGroupRepository groupRepository, IEventRepository eventRepository,
            ICamperRepository camperRepository, ICouponRepository couponRepository,
            IRegistrationRepository registrationRepository, IRedeemedCouponRepository redeemedCouponRepository,
            IPaymentDonationRepository paymentDonationRepository, ICustomFieldRepository customFieldRepository,
            ICamperCustomFieldRepository camperCustomFieldRepository)
        {
            _groupRepository = groupRepository;
            _eventRepository = eventRepository;
            _camperRepository = camperRepository;
            _couponRepository = couponRepository;
            _customFieldRepository = customFieldRepository;
            _registrationRepository = registrationRepository;
            _redeemedCouponRepository = redeemedCouponRepository;
            _paymentDonationRepository = paymentDonationRepository;
            _camperCustomFieldRepository = camperCustomFieldRepository;
        }

        [HttpPost("{eventId}/camper")]
        [ProducesResponseType(typeof(Registration), 200)]
        public async Task<ActionResult<Registration>> RegisterCamper(int portalId, int eventId,
            [FromBody] CamperOverrideModel camper)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await ValidateCustomFields(portalId, camper.CustomFields);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            Event dbEvent = await _eventRepository.GetEventById(portalId, eventId);
            Registration dbRegistration = await Register(portalId, camper, dbEvent, camper.PaymentId);

            return Ok(dbRegistration);
        }

        [HttpPost("{eventId}/group")]
        [ProducesResponseType(typeof(IEnumerable<Registration>), 200)]
        public async Task<ActionResult<IEnumerable<Registration>>> RegisterGroup(int portalId, int eventId,
            [FromBody] RegisterGroupModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event dbEvent = await _eventRepository.GetEventById(portalId, eventId);
            GroupModel groupModel = new GroupModel
            {
                Name = model.GroupName,
                IsActive = true
            };
            Group dbGroup = await _groupRepository.CreateGroup(portalId, groupModel);
            List<Registration> registrations = new List<Registration>();

            foreach (CamperOverrideModel camper in model.Campers)
            {
                try
                {
                    await ValidateCustomFields(portalId, camper.CustomFields);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

                camper.GroupId = dbGroup.Id;

                Registration registration = await Register(portalId, camper, dbEvent, model.PaymentId);

                registrations.Add(registration);
            }

            return Ok(registrations);
        }

        private async Task<Registration> Register(int portalId, CamperOverrideModel camper, Event dbEvent,
            int? paymentId)
        {
            Camper dbCamper = await _camperRepository.CreateCamper(portalId, camper);

            if (!string.IsNullOrEmpty(camper.Coupon))
            {
                IEnumerable<Coupon> dbCoupons = await _couponRepository.GetCouponsByCode(portalId, camper.Coupon);
                List<Coupon> coupons = dbCoupons.ToList();

                if (coupons.Any())
                {
                    await _redeemedCouponRepository.RedeemCoupon(coupons.First().Id, dbCamper.Id);
                }
            }

            await SaveCustomFields(dbCamper.Id, camper.CustomFields);

            RegistrationModel registrationModel = new RegistrationModel
            {
                Event = dbEvent,
                EventId = dbEvent.Id,
                CamperId = dbCamper.Id,
                IsActive = true,
                StartingBalance = camper.StartingBalance,
            };

            Registration registration = await _registrationRepository.CreateRegistration(portalId, registrationModel);

            if (paymentId != null)
            {
                await _paymentDonationRepository.AddRegistrationPayment(paymentId.Value, registration.Id);
            }

            return registration;
        }

        private async Task ValidateCustomFields(int portalId, IEnumerable<CamperCustomFieldModel> camperCustomFields)
        {
            foreach (CamperCustomFieldModel camperCustomField in camperCustomFields.Where(x =>
                string.IsNullOrEmpty(x.Value)))
            {
                CustomField customField =
                    await _customFieldRepository.GetCustomFieldById(portalId, camperCustomField.CustomFieldId);

                if (customField.Required)
                {
                    throw new Exception($"The field {customField.Name} is required.");
                }
            }
        }

        private async Task SaveCustomFields(int camperId, List<CamperCustomFieldModel> camperCustomFields)
        {
            if (camperCustomFields.Any())
            {
                foreach (CamperCustomFieldModel camperCustomField in camperCustomFields)
                {
                    await _camperCustomFieldRepository.SaveCamperCustomField(camperId, camperCustomField.CustomFieldId,
                        camperCustomField.Value);
                }
            }
        }
    }
}