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

        public async Task<int> CreateEvent(Event incomingEvent)
        {
            Context.Events.Add(incomingEvent);
            return await Context.SaveChangesAsync();
        }

        public async Task<int> UpdateEvent(Event incomingEvent)
        {
            Context.Events.Update(incomingEvent);
            return await Context.SaveChangesAsync();
        }

        public async Task<int> RemoveEventById(Event incomingEvent)
        {
            Context.Events.Remove(incomingEvent);
            return await Context.SaveChangesAsync();
        }
    }
}