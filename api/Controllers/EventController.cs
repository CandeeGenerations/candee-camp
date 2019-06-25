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
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }
        
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Event>), 200)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _eventRepository.GetEvents();
            
            return Ok(events);
        }

        [HttpGet("/getEventById/{id}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<Event> GetEventById(int id)
        {
            var newEvent = await _eventRepository.GetEventById(id);
            return newEvent;
        }

        [HttpPost("/createEvent/{event}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<int> CreateEvent(Event incomingEvent)
        {
            var newEvent = await _eventRepository.CreateEvent(incomingEvent);
            return newEvent;
        }

        [HttpPut("/updateEvent/{event}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<int> UpdateEvent(Event incomingEvent)
        {
            var updatedEvent = await _eventRepository.UpdateEvent(incomingEvent);
            return updatedEvent;
        }

        [HttpDelete("/removeEvent/{event}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<int> RemoveEventById(Event incomingEvent)
        {
            var removedEvent = await _eventRepository.RemoveEventById(incomingEvent);
            return removedEvent;
        }
    }
}