using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IRegistrationRepository
    {
        Task<IEnumerable<Registration>> GetRegistrations();
        Task<Registration> GetRegistrationById(int registrationId);
        Task<IEnumerable<Registration>> GetRegistrationsByCamperId(int camperId);
        Task<IEnumerable<Registration>> GetRegistrationsByEventId(int eventId);
        Task<Registration> CreateRegistration(RegistrationModel registration);
        Task DeleteRegistration(int registrationId);
        Task<Registration> UpdateRegistration(int registrationId, RegistrationModel registration);
    }
}