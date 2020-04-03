using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents(int portalId);
        Task<IEnumerable<Event>> GetEventsByIds(int portalId, IEnumerable<int> eventIds);
        Task<IEnumerable<Event>> GetEventsForRegistration(int portalId, int? currentEventId);
        Task<Event> GetEventById(int portalId, int eventId);
        Task<Event> CreateEvent(int portalId, EventModel incomingEvent);
        Task<Event> UpdateEvent(int portalId, int eventId, EventModel incomingEvent);
        Task DeleteEvent(int portalId, int eventId);
    }
}