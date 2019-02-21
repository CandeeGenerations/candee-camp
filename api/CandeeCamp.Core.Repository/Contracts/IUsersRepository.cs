using CandeeCamp.Core.Domain.DomainObjects;
using CandeeCamp.Core.Domain.Models;

namespace CandeeCamp.Core.Repository.Contracts
{
    public interface IUsersRepository
    {
        User AddUser(NewUserModel user);
        User ValidateUser(AuthenticationModel user);
    }
}