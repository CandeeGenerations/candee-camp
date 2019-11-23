using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents();
        Task<Event> GetEventById(int eventId);
        Task<Event> CreateEvent(Event incomingEvent);
        Task<Event> UpdateEvent(int eventId, Event incomingEvent);
        Task DeleteEvent(int eventId);
        Task<Event> FindEventByName(Event incomingEvent);
    }
}