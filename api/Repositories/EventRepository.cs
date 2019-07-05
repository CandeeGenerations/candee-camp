using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            IEnumerable<Event> dbEvents = await Context.Events.ToListAsync();

            return dbEvents;
        }

        public async Task<Event> GetEventById(int eventId)
        {
            Event dbEvent = await Context.Events.FindAsync(eventId);

            return dbEvent;
        }

        public async Task<Event> CreateEvent(Event incomingEvent)
        {
            if (incomingEvent.StartDate == DateTimeOffset.MinValue || incomingEvent.EndDate == DateTimeOffset.MinValue)
            {
                throw new Exception("The Start and End Dates are required.");
            }
            
            incomingEvent.IsActive = true;
            incomingEvent.IsDeleted = false;
            
            await Context.Events.AddAsync(incomingEvent);
            await Context.SaveChangesAsync();
            
            return incomingEvent;
        }

        public async Task<Event> UpdateEvent(Event incomingEvent)
        {
            if (incomingEvent.StartDate == DateTimeOffset.MinValue || incomingEvent.EndDate == DateTimeOffset.MinValue)
            {
                throw new Exception("The Start and End Dates are required.");
            }
            
            incomingEvent.UpdatedDate = DateTimeOffset.UtcNow;
            
            Context.Events.Update(incomingEvent);
            await Context.SaveChangesAsync();
            
            return incomingEvent;
        }

        public async Task DeleteEvent(int eventId)
        {
            Event dbEvent = await Context.Events.FindAsync(eventId);

            dbEvent.IsActive = false;
            dbEvent.IsDeleted = true;
            
            Context.Events.Update(dbEvent);
            await Context.SaveChangesAsync();
        }

        public async Task<Event> FindEventByName(Event incomingEvent)
        {
            return await Context.Events.SingleOrDefaultAsync(@event => @event.Name == incomingEvent.Name);
        }
    }
}