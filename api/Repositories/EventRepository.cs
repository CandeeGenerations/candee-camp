using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Event>> GetEvents() =>
            await Context.Events.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Event> GetEventById(int eventId)
        {
            Event dbEvent = await Context.Events.FirstOrDefaultAsync(x => x.Id == eventId && !x.IsDeleted);

            if (dbEvent == null)
            {
                throw new Exception("This event does not exist.");
            }

            return dbEvent;
        }

        public async Task<Event> CreateEvent(EventModel incomingEvent)
        {
            if (incomingEvent.StartDate == DateTimeOffset.MinValue || incomingEvent.EndDate == DateTimeOffset.MinValue)
            {
                throw new Exception("The Start and End Dates are required.");
            }

            if (incomingEvent.StartDate > incomingEvent.EndDate)
            {
                throw new Exception("The Start Date must occur before the End Date.");
            }

            Event newEvent = new Event()
            {
                Name = incomingEvent.Name.Trim(),
                Cost = incomingEvent.Cost,
                CreatedBy = incomingEvent.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                EndDate = incomingEvent.EndDate,
                IsActive = true,
                IsDeleted = false,
                StartDate = incomingEvent.StartDate,
                UpdatedDate = DateTimeOffset.Now
            };
            
            await Context.Events.AddAsync(newEvent);
            await Context.SaveChangesAsync();
            
            return newEvent;
        }

        public async Task<Event> UpdateEvent(int eventId, EventModel incomingEvent)
        {
            if (incomingEvent.StartDate == DateTimeOffset.MinValue ||
                incomingEvent.EndDate == DateTimeOffset.MinValue)
            {
                throw new Exception("The Start and End Dates are required.");
            }

            if (incomingEvent.StartDate > incomingEvent.EndDate)
            {
                throw new Exception("The Start Date must occur before the End Date.");
            }

            Event dbEvent = await GetEventById(eventId);

            dbEvent.Name = incomingEvent.Name.Trim();
            dbEvent.Cost = incomingEvent.Cost;
            dbEvent.StartDate = incomingEvent.StartDate;
            dbEvent.EndDate = incomingEvent.EndDate;
            dbEvent.UpdatedDate = DateTimeOffset.UtcNow;
            
            await Context.SaveChangesAsync();

            return dbEvent;
        }

        public async Task DeleteEvent(int eventId)
        {
            Event dbEvent = await GetEventById(eventId);

            dbEvent.IsActive = false;
            dbEvent.IsDeleted = true;
            
            await Context.SaveChangesAsync();
        }
    }
}