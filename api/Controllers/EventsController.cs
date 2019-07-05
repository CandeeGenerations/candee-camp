using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.API.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
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

        [HttpGet("{eventId}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> GetEventById(int eventId)
        {
            Event newEvent = await _eventRepository.GetEventById(eventId);
            
            return Ok(newEvent);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> CreateEvent([FromBody]Event incomingEvent)
        {
            Event newEvent = await _eventRepository.CreateEvent(incomingEvent);
            
            return Ok(newEvent);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<ActionResult<Event>> UpdateEvent([FromBody]Event incomingEvent)
        {
            Event updatedEvent = await _eventRepository.UpdateEvent(incomingEvent);
            
            return Ok(updatedEvent);
        }

        [HttpPut("/delete/{eventId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<bool>> DeleteEvent(int eventId)
        {
            await _eventRepository.DeleteEvent(eventId);
            
            return Ok();
        }
    }
}