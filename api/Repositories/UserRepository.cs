using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Common;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<User>> GetUsers() =>
            await Context.Users.Where(u => !u.IsDeleted).ToListAsync();

        private async Task<User> GetUserByEmail(string emailAddress) =>
            await Context.Users.FirstOrDefaultAsync(u => u.EmailAddress == emailAddress && !u.IsDeleted);
        
        public async Task<User> GetUserById(int userId)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted);

            if (dbUser == null)
            {
                throw new Exception("This user does not exist.");
            }

            return dbUser;
        }

        public async Task<User> CreateUser(NewUserModel user)
        {
            User dbUser = await GetUserByEmail(user.EmailAddress);

            if (dbUser != null)
            {
                throw new Exception("This user already exists.");
            }
            
            string salt = Helpers.CreateUniqueString(64);
            User newUser = new User
            {
                FirstName = user.FirstName.Trim(),
                LastName = user.LastName.Trim(),
                EmailAddress = user.EmailAddress.Trim(),
                PasswordHash = user.NewPassword.Encrypt(salt),
                Salt = salt,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false,
            };

            await Context.Users.AddAsync(newUser);
            await Context.SaveChangesAsync();

            return newUser;
        }

        public async Task<User> ValidateUser(AuthenticationModel user)
        {
            User dbUser = await GetUserByEmail(user.username);

            if (dbUser == null)
            {
                throw new Exception("The email address or password is incorrect.");
            }

            string passwordHash = user.password.Encrypt(dbUser.Salt);

            if (passwordHash != dbUser.PasswordHash)
            {
                throw new Exception("The email address or password is incorrect.");
            }
            
            dbUser.LastLoggedInDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();
                
            return dbUser;
        }

        public async Task SendForgotPasswordEmail(string emailAddress)
        {
            User dbUser = await GetUserByEmail(emailAddress);

            if (dbUser == null)
            {
                return;
            }
            
            string token = Helpers.CreateUniqueString(24, Helpers.CharactersLibrary.ALPHANUMERIC_CAPITAL_LOWER);

            dbUser.ResetPasswordToken = token;
            dbUser.ResetPasswordExpirationDate = DateTimeOffset.UtcNow.AddMinutes(10);
            
            // TODO : Send email

            await Context.SaveChangesAsync();
        }

        public async Task<bool> ValidateResetToken(ResetPasswordModel model)
        {
            User dbUser = await GetUserById(model.UserId);

            if (dbUser == null || dbUser.ResetPasswordToken != model.Token)
            {
                return false;
            }

            return DateTimeOffset.UtcNow < dbUser.ResetPasswordExpirationDate;
        }

        public async Task<User> ResetPassword(ResetPasswordModel model)
        {
            User dbUser = await GetUserById(model.UserId);

            if (dbUser.ResetPasswordToken != model.Token || DateTimeOffset.UtcNow >= dbUser.ResetPasswordExpirationDate)
            {
                throw new Exception("This reset password token is invalid or has expired. Please try again later.");
            }
            
            string salt = Helpers.CreateUniqueString(64);

            dbUser.UpdatedDate = DateTimeOffset.Now;
            dbUser.ResetPasswordToken = null;
            dbUser.ResetPasswordExpirationDate = null;
            dbUser.Salt = salt;
            dbUser.PasswordHash = model.Password.Encrypt(salt);

            await Context.SaveChangesAsync();

            return dbUser;
        }

        public async Task<User> ChangePassword(int userId, string newPassword)
        {
            if (string.IsNullOrWhiteSpace(newPassword))
            {
                throw new Exception("The new password field is required.");
            }

            User dbUser = await GetUserById(userId);
            string salt = Helpers.CreateUniqueString(64);

            dbUser.UpdatedDate = DateTimeOffset.Now;
            dbUser.Salt = salt;
            dbUser.PasswordHash = newPassword.Encrypt(salt);

            await Context.SaveChangesAsync();

            return dbUser;
        }

        public async Task DeleteUser(int userId)
        {
            User dbUser = await GetUserById(userId);

            dbUser.IsActive = false;
            dbUser.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<User> UpdateUser(int userId, UserModel user)
        {
            User dbUser = await GetUserById(userId);

            dbUser.FirstName = user.FirstName.Trim();
            dbUser.LastName = user.LastName.Trim();
            dbUser.EmailAddress = user.EmailAddress.Trim();
            dbUser.IsActive = user.IsActive;
            dbUser.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbUser;
        }

        public async Task<IEnumerable<User>> GetUsersByIds(IEnumerable<int> userIds)
        {
            int[] userIdsArray = userIds as int[] ?? userIds.ToArray();
            
            if (!userIdsArray.Any())
            {
                throw new Exception("No user IDs detected.");
            }
            
            return await Context.Users.Where(u => userIdsArray.Contains(u.Id)).ToListAsync();
        }
    }
}