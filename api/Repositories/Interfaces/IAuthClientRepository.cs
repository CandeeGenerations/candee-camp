using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IAuthClientRepository
    {
        Task<AuthClient> GetAuthClient(AuthenticationModel authenticationModel);
    }
}