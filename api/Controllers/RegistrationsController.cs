using System.Collections.Generic;
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
    public class RegistrationsController : Controller
    {
        private readonly IEventRepository _eventRepository;
        private readonly IRegistrationRepository _registrationRepository;

        public RegistrationsController(IEventRepository eventRepository, IRegistrationRepository registrationRepository)
        {
            _eventRepository = eventRepository;
            _registrationRepository = registrationRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Registration>), 200)]
        public async Task<ActionResult<IEnumerable<Registration>>> GetRegistrations(int portalId)
        {
            IEnumerable<Registration> registrations = await _registrationRepository.GetRegistrations(portalId);

            return Ok(registrations);
        }

        [HttpGet("{registrationId}")]
        [ProducesResponseType(typeof(Registration), 200)]
        public async Task<ActionResult<Registration>> GetRegistration(int portalId, int registrationId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Registration registration = await _registrationRepository.GetRegistrationById(portalId, registrationId);

            return Ok(registration);
        }

        [HttpGet("camper/{camperId}")]
        [ProducesResponseType(typeof(IEnumerable<Registration>), 200)]
        public async Task<ActionResult<IEnumerable<Registration>>> GetRegistrationsByCamperId(int portalId,
            int camperId)
        {
            IEnumerable<Registration> registrations =
                await _registrationRepository.GetRegistrationsByCamperId(portalId, camperId);

            return Ok(registrations);
        }

        [HttpGet("event/{eventId}")]
        [ProducesResponseType(typeof(IEnumerable<Registration>), 200)]
        public async Task<ActionResult<IEnumerable<Registration>>> GetRegistrationsByEventId(int portalId, int eventId)
        {
            IEnumerable<Registration> registrations =
                await _registrationRepository.GetRegistrationsByEventId(portalId, eventId);

            return Ok(registrations);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Registration), 200)]
        public async Task<ActionResult<Registration>> CreateRegistration(int portalId,
            [FromBody] RegistrationModel registration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event registeredEvent = await _eventRepository.GetEventById(portalId, registration.EventId);

            registration.Event = registeredEvent;

            Registration newRegistration = await _registrationRepository.CreateRegistration(portalId, registration);

            return Ok(newRegistration);
        }

        [HttpPut("{registrationId}")]
        [ProducesResponseType(typeof(Registration), 200)]
        public async Task<ActionResult<Registration>> UpdateRegistration(int portalId, int registrationId,
            [FromBody] RegistrationModel registration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event registeredEvent = await _eventRepository.GetEventById(portalId, registration.EventId);

            registration.Event = registeredEvent;

            Registration updatedRegistration =
                await _registrationRepository.UpdateRegistration(portalId, registrationId, registration);

            return Ok(updatedRegistration);
        }

        [HttpDelete("{registrationId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteRegistration(int portalId, int registrationId)
        {
            await _registrationRepository.DeleteRegistration(portalId, registrationId);

            return Ok();
        }
    }
}