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
    [Route("api/[controller]/{portalId}")]
    [Produces("application/json")]
    public class EventsController : Controller
    {
        private readonly IEventRepository _eventRepository;

        public EventsController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Event>), 200)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents(int portalId)
        {
            IEnumerable<Event> events = await _eventRepository.GetEvents(portalId);

            return Ok(events);
        }

        [HttpGet("by-ids")]
        [ProducesResponseType(typeof(IEnumerable<Event>), 200)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsByIds(int portalId, IEnumerable<int> eventIds)
        {
            IEnumerable<Event> events = await _eventRepository.GetEventsByIds(portalId, eventIds);

            return Ok(events);
        }

        [HttpGet("for-registration")]
        [ProducesResponseType(typeof(IEnumerable<Event>), 200)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsForRegistration(int portalId, int? currentEventId)
        {
            IEnumerable<Event> events = await _eventRepository.GetEventsForRegistration(portalId, currentEventId);

            return Ok(events);
        }

        [HttpGet("{eventId}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> GetEventById(int portalId, int eventId)
        {
            Event newEvent = await _eventRepository.GetEventById(portalId, eventId);

            return Ok(newEvent);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> CreateEvent(int portalId, [FromBody] EventModel incomingEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event newEvent = await _eventRepository.CreateEvent(portalId, incomingEvent);

            return Ok(newEvent);
        }

        [HttpPut("{eventId}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> UpdateEvent(int portalId, int eventId,
            [FromBody] EventModel incomingEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event updatedEvent = await _eventRepository.UpdateEvent(portalId, eventId, incomingEvent);

            return Ok(updatedEvent);
        }

        [HttpDelete("{eventId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<bool>> DeleteEvent(int portalId, int eventId)
        {
            await _eventRepository.DeleteEvent(portalId, eventId);

            return Ok();
        }
    }
}