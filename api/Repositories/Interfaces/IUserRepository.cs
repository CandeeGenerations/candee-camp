using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> CreateUser(NewUserModel user);
        Task<User> ValidateUser(AuthenticationModel user);
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int userId);
        Task SendForgotPasswordEmail(string emailAddress);
        Task<bool> ValidateResetToken(ResetPasswordModel model);
        Task<User> ResetPassword(ResetPasswordModel model);
        Task<User> ChangePassword(int userId, string newPassword);
        Task DeleteUser(int userId);
        Task<User> UpdateUser(int userId, UserModel user);
        Task<IEnumerable<User>> GetUsersByIds(IEnumerable<int> userIds);
    }
}