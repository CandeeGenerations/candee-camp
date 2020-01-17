using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IAuthClientRepository
    {
        Task<AuthClient> GetAuthClient(AuthenticationModel authenticationModel);
    }
}