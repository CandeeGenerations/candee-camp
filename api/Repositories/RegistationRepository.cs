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
    public class RegistrationRepository : BaseRepository, IRegistrationRepository
    {
        public RegistrationRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Registration>> GetRegistrations() =>
            await Context.Registrations.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Registration> GetRegistrationById(int registrationId)
        {
            Registration dbRegistration =
                await Context.Registrations.FirstOrDefaultAsync(x => x.Id == registrationId && !x.IsDeleted);

            if (dbRegistration == null)
            {
                throw new Exception("This registration does not exist.");
            }

            return dbRegistration;
        }

        public async Task<IEnumerable<Registration>> GetRegistrationsByCamperId(int camperId) =>
            await Context.Registrations.Where(x => !x.IsDeleted && x.CamperId == camperId).ToListAsync();

        public async Task<IEnumerable<Registration>> GetRegistrationsByEventId(int eventId) => 
            await Context.Registrations.Where(x => !x.IsDeleted && x.EventId == eventId).ToListAsync();
        
        public async Task<Registration> CreateRegistration(RegistrationModel registration)
        {
            if (registration.Event.StartDate < DateTimeOffset.Now)
            {
                throw new Exception("Registration is currently closed for this event.");
            }

            if (registration.CheckInDate != null && registration.CheckOutDate != null &&
                registration.CheckInDate > registration.CheckOutDate)
            {
                throw new Exception("The Check In date must be before the Check Out date.");
            }

            Registration newRegistration = new Registration
            {
                RegistrationDate = DateTimeOffset.Now,
                StartingBalance = registration.StartingBalance,
                CheckInDate = registration.CheckInDate,
                CheckOutDate = registration.CheckOutDate,
                IsActive = true,
                IsDeleted = false,
                EventId = registration.Event.Id,
                CamperId = registration.CamperId
            };

            await Context.Registrations.AddAsync(newRegistration);
            await Context.SaveChangesAsync();

            return newRegistration;
        }

        public async Task DeleteRegistration(int registrationId)
        {
            Registration dbRegistration = await GetRegistrationById(registrationId);

            dbRegistration.IsActive = false;
            dbRegistration.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Registration> UpdateRegistration(int registrationId, RegistrationModel registration)
        {
            if (registration.Event.StartDate < DateTimeOffset.Now)
            {
                throw new Exception("Registration is currently closed for this event.");
            }

            if (registration.CheckInDate != null && registration.CheckOutDate != null &&
                registration.CheckInDate > registration.CheckOutDate)
            {
                throw new Exception("The Check In date must be before the Check Out date.");
            }

            Registration dbRegistration = await GetRegistrationById(registrationId);

            dbRegistration.StartingBalance = registration.StartingBalance;
            dbRegistration.CheckInDate = registration.CheckInDate;
            dbRegistration.CheckOutDate = registration.CheckOutDate;
            dbRegistration.IsActive = registration.IsActive;
            dbRegistration.EventId = registration.Event.Id;
            dbRegistration.CamperId = registration.CamperId;

            await Context.SaveChangesAsync();

            return dbRegistration;
        }
    }
}