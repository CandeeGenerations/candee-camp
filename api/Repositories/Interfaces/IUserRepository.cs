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
        Task SendForgotPasswordEmail(string emailAddress);
        Task<bool> ValidateResetToken(ResetPasswordModel model);
        Task<User> ResetPassword(ResetPasswordModel model);
        Task<User> ChangePassword(int userId, string newPassword);
        Task DeleteUser(int userId);
        Task<User> UpdateUser(int userId, UserModel user);
    }
}