using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using CandeeCamp.Core.Domain.DomainObjects;
using CandeeCamp.Core.Domain.Models;
using CandeeCamp.Core.Repository.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CandeeCamp.Core.Api.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/token")]
    [Produces("application/json")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUsersRepository _usersRepository;

        public AuthenticationController(IConfiguration config, IUsersRepository usersRepository)
        {
            _config = config;
            _usersRepository = usersRepository;
        }
        
        /// <summary>
        /// Authenticates a User to Access the API.
        /// </summary>
        /// <remarks>
        /// Sample Request:
        ///
        ///     POST /api/v1/token
        ///     {
        ///         "username": "cgen01",
        ///         "password": "abc123!"
        ///     }
        /// 
        /// </remarks>
        /// <param name="authentication"></param>
        /// <returns>Unauthorized or the Token Object.</returns>
        /// <response code="200">Returns the Token Object.</response>
        /// <response code="401">The User Authentication was Unsuccessful.</response>
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(typeof(TokenModel), 200)]
        [ProducesResponseType(401)]
        public IActionResult CreateToken([FromBody] AuthenticationModel authentication)
        {
            IActionResult response = Unauthorized();
            var user = _usersRepository.ValidateUser(authentication);

            if (user == null) return response;

            response = Ok(new TokenModel(BuildToken(user)));

            return response;
        }

        [HttpGet("claims")]
        public IActionResult Claims()
        {
            return Ok(new
            {
                result = User.Claims.Select(x => new
                {
                    x.Type,
                    x.Value
                })
            });
        }

        #region Private Methods

        private string BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var identityClaims = BuildClaims(user);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], identityClaims.Claims,
                expires: DateTime.Now.AddMinutes(30), signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static ClaimsIdentity BuildClaims(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Token");

            claimsIdentity.AddClaims(user.UserRoles.Select(x => new Claim(ClaimTypes.Role, x.Role.Name)));

            return claimsIdentity;
        }

        #endregion
    }
}