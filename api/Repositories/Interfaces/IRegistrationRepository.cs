using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IRegistrationRepository
    {
        Task<IEnumerable<Registration>> GetRegistrations(int portalId);
        Task<Registration> GetRegistrationById(int portalId, int registrationId);
        Task<IEnumerable<Registration>> GetRegistrationsByCamperId(int portalId, int camperId);
        Task<IEnumerable<Registration>> GetRegistrationsByEventId(int portalId, int eventId);
        Task<Registration> CreateRegistration(int portalId, RegistrationModel registration);
        Task DeleteRegistration(int portalId, int registrationId);
        Task<Registration> UpdateRegistration(int portalId, int registrationId, RegistrationModel registration);
    }
}