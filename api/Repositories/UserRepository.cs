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
            var salt = Helpers.CreateUniqueString(64);
            var newUser = new User
            {
                Id = Guid.NewGuid(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmailAddress = user.EmailAddress,
                PasswordHash = user.Password.Encrypt(salt),
                Salt = salt,
                DateCreated = DateTimeOffset.Now
            };

            await Context.Users.AddAsync(newUser);
            await Context.SaveChangesAsync();

            return newUser;
        }

        public async Task<User> ValidateUser(AuthenticationModel user)
        {
            var dbUser = await Context.Users.FirstOrDefaultAsync(x => x.EmailAddress == user.username);

            if (dbUser == null)
            {
                return null;
            }

            var passwordHash = user.password.Encrypt(dbUser.Salt);

            if (passwordHash != dbUser.PasswordHash)
            {
                return null;
            }

            var refreshToken = Helpers.CreateUniqueString(24, Helpers.CharactersLibrary.ALPHANUMERIC_CAPITAL_LOWER);
            
            dbUser.LastLoggedInDate = DateTimeOffset.Now;
            dbUser.RefreshToken = refreshToken;

            await Context.SaveChangesAsync();
                
            return dbUser;
        }

        public async Task<User> ValidateRefreshToken(AuthenticationModel user)
        {
            var dbUser = await Context.Users.FirstOrDefaultAsync(x => x.RefreshToken == user.refresh_token);

            if (dbUser == null)
            {
                return null;
            }

            var refreshToken = Helpers.CreateUniqueString(24, Helpers.CharactersLibrary.ALPHANUMERIC_CAPITAL_LOWER);
            
            dbUser.LastLoggedInDate = DateTimeOffset.Now;
            dbUser.RefreshToken = refreshToken;

            await Context.SaveChangesAsync();

            return dbUser;
        }
    }
}