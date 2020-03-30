using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class AuthClientRepository : BaseRepository, IAuthClientRepository
    {
        public AuthClientRepository(CampContext context) : base(context)
        {
        }

        public async Task<AuthClient> GetAuthClient(AuthenticationModel authenticationModel)
        {
            if (authenticationModel.grant_type == "auth_client" &&
                (string.IsNullOrEmpty(authenticationModel.client_name) ||
                 string.IsNullOrEmpty(authenticationModel.client_secret) ||
                 string.IsNullOrEmpty(authenticationModel.client_uri)))
            {
                throw new Exception("The client data is required but has not been supplied.");
            }

            if (authenticationModel.grant_type != "auth_client")
            {
                throw new Exception("You cannot log in this way.");
            }

            return await Context.AuthClients.FirstOrDefaultAsync(x =>
                x.ClientName == authenticationModel.client_name &&
                x.ClientSecret == authenticationModel.client_secret && x.ClientUri == authenticationModel.client_uri &&
                x.IsActive);
        }
    }
}