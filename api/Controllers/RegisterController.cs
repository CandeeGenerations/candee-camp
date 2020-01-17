using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Common;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(Policy = CampPolicies.Registrations)]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RegisterController : Controller
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IEventRepository _eventRepository;
        private readonly ICamperRepository _camperRepository;
        private readonly ICouponRepository _couponRepository;
        private readonly IRegistrationRepository _registrationRepository;
        private readonly IRedeemedCouponRepository _redeemedCouponRepository;

        public RegisterController(IGroupRepository groupRepository, IEventRepository eventRepository,
            ICamperRepository camperRepository, ICouponRepository couponRepository,
            IRegistrationRepository registrationRepository, IRedeemedCouponRepository redeemedCouponRepository)
        {
            _groupRepository = groupRepository;
            _eventRepository = eventRepository;
            _camperRepository = camperRepository;
            _couponRepository = couponRepository;
            _registrationRepository = registrationRepository;
            _redeemedCouponRepository = redeemedCouponRepository;
        }

        [HttpPost("{eventId}/camper")]
        [ProducesResponseType(typeof(Registration), 200)]
        public async Task<ActionResult<Registration>> RegisterCamper(int eventId, [FromBody]CamperOverrideModel camper)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Event dbEvent = await _eventRepository.GetEventById(eventId);
            Registration dbRegistration = await Register(camper, dbEvent);

            return Ok(dbRegistration);
        }

        [HttpPost("{eventId}/group")]
        [ProducesResponseType(typeof(IEnumerable<Registration>), 200)]
        public async Task<ActionResult<IEnumerable<Registration>>> RegisterGroup(int eventId, [FromBody]RegisterGroupModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Event dbEvent = await _eventRepository.GetEventById(eventId);
            GroupModel groupModel = new GroupModel
            {
                Name = model.GroupName,
                IsActive = true
            };
            Group dbGroup = await _groupRepository.CreateGroup(groupModel);
            List<Registration> registrations = new List<Registration>();

            foreach (CamperOverrideModel camper in model.Campers)
            {
                camper.GroupId = dbGroup.Id;
                
                Registration registration = await Register(camper, dbEvent);
                
                registrations.Add(registration);
            }

            return Ok(registrations);
        }

        private async Task<Registration> Register(CamperOverrideModel camper, Event dbEvent)
        {
            Camper dbCamper = await _camperRepository.CreateCamper(camper);
            
            if (!string.IsNullOrEmpty(camper.Coupon))
            {
                IEnumerable<Coupon> dbCoupons = await _couponRepository.GetCouponsByCode(camper.Coupon);
                List<Coupon> coupons = dbCoupons.ToList();

                if (coupons.Any())
                {
                    await _redeemedCouponRepository.RedeemCoupon(coupons.First().Id, dbCamper.Id);
                }
            }
            
            RegistrationModel registrationModel = new RegistrationModel
            {
                Event = dbEvent,
                EventId = dbEvent.Id,
                CamperId = dbCamper.Id,
                IsActive = true,
                StartingBalance = camper.StartingBalance,
            };
            
            return await _registrationRepository.CreateRegistration(registrationModel);
        }
    }
}