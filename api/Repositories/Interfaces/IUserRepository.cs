using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> CreateUser(int portalId, NewUserModel user);
        Task<User> ValidateUser(AuthenticationModel user);
        Task<IEnumerable<User>> GetUsers(int portalId);
        Task<User> GetUserById(int userId);
        Task<User> GetUserByIdPortalId(int portalId, int userId);
        Task SendForgotPasswordEmail(string emailAddress);
        Task<bool> ValidateResetToken(ResetPasswordModel model);
        Task<User> ResetPassword(ResetPasswordModel model);
        Task<User> ChangePassword(int portalId, int userId, string newPassword);
        Task DeleteUser(int portalId, int userId);
        Task<User> UpdateUser(int portalId, int userId, UserModel user);
        Task<IEnumerable<User>> GetUsersByIds(int portalId, IEnumerable<int> userIds);
    }
}