using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Event>> GetEvents(int portalId, EventFilterModel filters = null)
        {
            IQueryable<Event> events = Context.Events.Where(x => x.PortalId == portalId && !x.IsDeleted);

            if (filters == null) return await events.ToListAsync();
            {
                if (!string.IsNullOrEmpty(filters.Name))
                {
                    events = events.Where(x => x.Name.ToLower().Contains(filters.Name.Trim().ToLower()));
                }

                if (filters.OnGoing != null)
                {
                    events = filters.OnGoing.Value
                        ? events.Where(x => x.StartDate < DateTimeOffset.Now && x.EndDate > DateTimeOffset.Now)
                        : events.Where(x => x.StartDate > DateTimeOffset.Now || x.EndDate < DateTimeOffset.Now);
                }

                if (filters.CostEnd != null && filters.CostStart != null)
                {
                    events = events.Where(x => x.Cost >= filters.CostStart.Value && x.Cost <= filters.CostEnd.Value);
                }

                if (filters.DateEnd != null && filters.DateStart != null)
                {
                    events = events.Where(x =>
                        x.StartDate >= filters.DateStart.Value && x.EndDate <= filters.DateEnd.Value);
                }
            }

            return await events.ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetEventsByIds(int portalId, IEnumerable<int> eventIds)
        {
            int[] eventIdsArray = eventIds as int[] ?? eventIds.ToArray();

            if (!eventIdsArray.Any())
            {
                throw new Exception("No event IDs detected.");
            }

            return await Context.Events.Where(e => e.PortalId == portalId && eventIdsArray.Contains(e.Id))
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetEventsForRegistration(int portalId, int? currentEventId)
        {
            Event currentEvent = null;

            if (currentEventId != null)
            {
                currentEvent = await Context.Events.Where(e => e.PortalId == portalId && e.Id == currentEventId.Value)
                    .FirstOrDefaultAsync();

                if (currentEvent == null)
                {
                    throw new Exception("The current event doesn't exist.");
                }
            }

            List<Event> events = await Context.Events
                .Where(e => e.PortalId == portalId && e.IsActive && !e.IsDeleted && e.StartDate > DateTimeOffset.Now)
                .ToListAsync();

            if (currentEvent == null)
            {
                return events;
            }

            bool alreadyExists = events.Any(x => x.Id == currentEvent.Id);

            return alreadyExists ? events : new[] {currentEvent}.Concat(events);
        }

        public async Task<Event> GetEventById(int portalId, int eventId)
        {
            Event dbEvent =
                await Context.Events.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == eventId && !x.IsDeleted);

            if (dbEvent == null)
            {
                throw new Exception("This event does not exist.");
            }

            return dbEvent;
        }

        public async Task<Event> CreateEvent(int portalId, EventModel incomingEvent)
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
                PortalId = portalId,
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

        public async Task<Event> UpdateEvent(int portalId, int eventId, EventModel incomingEvent)
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

            Event dbEvent = await GetEventById(portalId, eventId);

            dbEvent.Name = incomingEvent.Name.Trim();
            dbEvent.Cost = incomingEvent.Cost;
            dbEvent.StartDate = incomingEvent.StartDate;
            dbEvent.EndDate = incomingEvent.EndDate;
            dbEvent.UpdatedDate = DateTimeOffset.UtcNow;

            await Context.SaveChangesAsync();

            return dbEvent;
        }

        public async Task DeleteEvent(int portalId, int eventId)
        {
            Event dbEvent = await GetEventById(portalId, eventId);

            dbEvent.IsActive = false;
            dbEvent.IsDeleted = true;

            await Context.SaveChangesAsync();
        }
    }
}