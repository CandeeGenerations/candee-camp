using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> CreateUser(NewUserModel user);
        Task<User> ValidateUser(AuthenticationModel user);
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int userId);
    }
}