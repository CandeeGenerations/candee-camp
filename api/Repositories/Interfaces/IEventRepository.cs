using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents();
        Task<IEnumerable<Event>> GetEventsByIds(IEnumerable<int> eventIds);
        Task<Event> GetEventById(int eventId);
        Task<Event> CreateEvent(EventModel incomingEvent);
        Task<Event> UpdateEvent(int eventId, EventModel incomingEvent);
        Task DeleteEvent(int eventId);
    }
}