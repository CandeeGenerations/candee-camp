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
            IEnumerable<Event> events = await _eventRepository.GetEvents();
            
            return Ok(events);
        }

        [HttpGet("/getEventById/{id}")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<Event> GetEventById(int id)
        {
            Event newEvent = await _eventRepository.GetEventById(id);
            return newEvent;
        }

        [HttpPost("/createEvent")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<Event> CreateEvent([FromBody]Event incomingEvent)
        {
            Event newEvent = await _eventRepository.CreateEvent(incomingEvent);
            return newEvent;
        }

        [HttpPut("/updateEvent")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<Event> UpdateEvent([FromBody]Event incomingEvent)
        {
            Event updatedEvent = await _eventRepository.UpdateEvent(incomingEvent);
            return updatedEvent;
        }

        [HttpPut("/removeEvent")]
        [ProducesResponseType(typeof(Task<Event>), 200)]
        public async Task<Event> RemoveEvent([FromBody]Event incomingEvent)
        {
            Event removedEvent = await _eventRepository.RemoveEvent(incomingEvent);
            return removedEvent;
        }
    }
}