using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents();
        Task<Event> GetEventById(int id);
        Task<int> CreateEvent(Event incomingEvent);
        Task<int> UpdateEvent(Event incomingEvent);
        Task<int> RemoveEventById(Event incomingEvent);
    }
}