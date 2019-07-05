using System;
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

        public async Task<User> AddUser(NewUserModel user)
        {
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
            User dbUser = await Context.Users.FirstOrDefaultAsync(x => x.EmailAddress == user.username);

            if (dbUser == null)
            {
                return null;
            }

            string passwordHash = user.password.Encrypt(dbUser.Salt);

            if (passwordHash != dbUser.PasswordHash)
            {
                return null;
            }
            
            dbUser.LastLoggedInDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();
                
            return dbUser;
        }
    }
}