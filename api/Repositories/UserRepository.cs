using System;
using System.Collections.Generic;
using System.Net.Mime;
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

        public async Task<User> CreateUser(NewUserModel user)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.EmailAddress);

            if (dbUser != null)
            {
                throw new Exception("This user already exists.");
            }
            
            string salt = Helpers.CreateUniqueString(64);
            User newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmailAddress = user.EmailAddress,
                PasswordHash = user.Password.Encrypt(salt),
                Salt = salt,
                CreatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false,
            };

            await Context.Users.AddAsync(newUser);
            await Context.SaveChangesAsync();

            return newUser;
        }

        public async Task<User> ValidateUser(AuthenticationModel user)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.EmailAddress == user.username);

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

        public async Task<IEnumerable<User>> GetUsers()
        {
            IEnumerable<User> dbUsers = await Context.Users.ToListAsync();

            return dbUsers;
        }

        public async Task<User> GetUserById(int userId)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (dbUser == null)
            {
                throw new Exception("This user does not exist.");
            }

            return dbUser;
        }

        public async Task SendForgotPasswordEmail(string emailAddress)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.EmailAddress == emailAddress);

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

        public async Task<bool> ValidateResetToken(int userId, string token)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.Id == userId && u.ResetPasswordToken == token);

            if (dbUser == null)
            {
                return false;
            }

            return DateTimeOffset.UtcNow < dbUser.ResetPasswordExpirationDate;
        }

        public async Task<User> ResetPassword(int userId, string token, string password)
        {
            User dbUser = await Context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (dbUser == null)
            {
                throw new Exception("This user does not exist.");
            }

            if (dbUser.ResetPasswordToken != token || DateTimeOffset.UtcNow >= dbUser.ResetPasswordExpirationDate)
            {
                throw new Exception("This reset password token is invalid or has expired. Please try again later.");
            }
            
            string salt = Helpers.CreateUniqueString(64);

            dbUser.ResetPasswordToken = null;
            dbUser.ResetPasswordExpirationDate = null;
            dbUser.Salt = salt;
            dbUser.PasswordHash = password.Encrypt(salt);

            await Context.SaveChangesAsync();

            return dbUser;
        }
    }
}