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
            return await Context.Events.ToListAsync();
        }

        public async Task<Event> GetEventById(int id)
        {
            return await Context.Events.FindAsync(id);
        }

        public async Task<Event> CreateEvent(Event incomingEvent)
        {
            Context.Events.Add(incomingEvent);
            await Context.SaveChangesAsync();
            return await FindEvent(incomingEvent);
        }

        public async Task<Event> UpdateEvent(Event incomingEvent)
        {
            Context.Events.Update(incomingEvent);
            await Context.SaveChangesAsync();
            return await FindEvent(incomingEvent);
        }

        public async Task<Event> RemoveEvent(Event incomingEvent)
        {
            incomingEvent.IsDeleted = true;
            Context.Events.Update(incomingEvent);
            await Context.SaveChangesAsync();
            return await FindEvent(incomingEvent);
        }

        public async Task<Event> FindEvent(Event incomingEvent)
        {
            return await Context.Events.SingleOrDefaultAsync(@event => @event.Name == incomingEvent.Name);
        }
    }
}