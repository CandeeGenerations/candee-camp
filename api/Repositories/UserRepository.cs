using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Common;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<User>> GetUsers(int portalId) =>
            await Context.Users.Where(x => x.PortalId == portalId && !x.IsDeleted).ToListAsync();

        private async Task<User> GetUserByEmail(string emailAddress) =>
            await Context.Users.FirstOrDefaultAsync(x => x.EmailAddress == emailAddress && !x.IsDeleted);

        public async Task<User> GetUserById(int userId)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(x => x.Id == userId && !x.IsDeleted);

            if (dbUser == null)
            {
                throw new Exception("This user does not exist.");
            }

            return dbUser;
        }

        public async Task<User> GetUserByIdPortalId(int portalId, int userId)
        {
            User dbUser =
                await Context.Users.FirstOrDefaultAsync(x => x.PortalId == portalId && x.Id == userId && !x.IsDeleted);

            if (dbUser == null)
            {
                throw new Exception("This user does not exist.");
            }

            return dbUser;
        }

        public async Task<User> CreateUser(int portalId, NewUserModel user)
        {
            User dbUser = await GetUserByEmail(user.EmailAddress);

            if (dbUser != null)
            {
                throw new Exception("This user already exists.");
            }

            string salt = Helpers.CreateUniqueString(64);

            User newUser = new User
            {
                PortalId = portalId,
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

        public async Task<User> ChangePassword(int portalId, int userId, string newPassword)
        {
            if (string.IsNullOrWhiteSpace(newPassword))
            {
                throw new Exception("The new password field is required.");
            }

            User dbUser = await GetUserByIdPortalId(portalId, userId);
            string salt = Helpers.CreateUniqueString(64);

            dbUser.UpdatedDate = DateTimeOffset.Now;
            dbUser.Salt = salt;
            dbUser.PasswordHash = newPassword.Encrypt(salt);

            await Context.SaveChangesAsync();

            return dbUser;
        }

        public async Task DeleteUser(int portalId, int userId)
        {
            User dbUser = await GetUserByIdPortalId(portalId, userId);

            dbUser.IsActive = false;
            dbUser.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<User> UpdateUser(int portalId, int userId, UserModel user)
        {
            User dbUser = await GetUserByIdPortalId(portalId, userId);

            dbUser.FirstName = user.FirstName.Trim();
            dbUser.LastName = user.LastName.Trim();
            dbUser.EmailAddress = user.EmailAddress.Trim();
            dbUser.IsActive = user.IsActive;
            dbUser.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbUser;
        }

        public async Task<IEnumerable<User>> GetUsersByIds(int portalId, IEnumerable<int> userIds)
        {
            int[] userIdsArray = userIds as int[] ?? userIds.ToArray();

            if (!userIdsArray.Any())
            {
                throw new Exception("No user IDs detected.");
            }

            return await Context.Users.Where(u => u.PortalId == portalId && userIdsArray.Contains(u.Id)).ToListAsync();
        }
    }
}