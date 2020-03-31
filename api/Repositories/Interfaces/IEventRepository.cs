using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents();
        Task<IEnumerable<Event>> GetEventsByIds(IEnumerable<int> eventIds);
        Task<IEnumerable<Event>> GetEventsForRegistration(int? currentEventId);
        Task<Event> GetEventById(int eventId);
        Task<Event> CreateEvent(EventModel incomingEvent);
        Task<Event> UpdateEvent(int eventId, EventModel incomingEvent);
        Task DeleteEvent(int eventId);
    }
}