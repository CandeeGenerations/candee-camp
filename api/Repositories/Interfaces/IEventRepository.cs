using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEvents();
        Task<Event> GetEventById(int id);
        Task<Event> CreateEvent(Event incomingEvent);
        Task<Event> UpdateEvent(Event incomingEvent);
        Task<Event> RemoveEvent(Event incomingEvent);
        Task<Event> FindEvent(Event incomingEvent);
    }
}