using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/[controller]")]
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
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            IEnumerable<Event> events = await _eventRepository.GetEvents();
            
            return Ok(events);
        }

        [HttpGet("by-ids")]
        [ProducesResponseType(typeof(IEnumerable<Event>), 200)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsByIds(IEnumerable<int> eventIds)
        {
            IEnumerable<Event> events = await _eventRepository.GetEventsByIds(eventIds);

            return Ok(events);
        }
        
        [HttpGet("for-registration")]
        [ProducesResponseType(typeof(IEnumerable<Event>), 200)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsForRegistration(int? currentEventId)
        {
            IEnumerable<Event> events = await _eventRepository.GetEventsForRegistration(currentEventId);
            
            return Ok(events);
        }

        [HttpGet("{eventId}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> GetEventById(int eventId)
        {
            Event newEvent = await _eventRepository.GetEventById(eventId);
            
            return Ok(newEvent);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> CreateEvent([FromBody]EventModel incomingEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Event newEvent = await _eventRepository.CreateEvent(incomingEvent);
            
            return Ok(newEvent);
        }

        [HttpPut("{eventId}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> UpdateEvent(int eventId, [FromBody]EventModel incomingEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Event updatedEvent = await _eventRepository.UpdateEvent(eventId, incomingEvent);
            
            return Ok(updatedEvent);
        }

        [HttpDelete("{eventId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<bool>> DeleteEvent(int eventId)
        {
            await _eventRepository.DeleteEvent(eventId);
            
            return Ok();
        }
    }
}