using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddUser(NewUserModel user);
        Task<User> ValidateUser(AuthenticationModel user);
    }
}