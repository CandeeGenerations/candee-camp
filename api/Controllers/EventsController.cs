using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
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