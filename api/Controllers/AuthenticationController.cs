using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CandeeCamp.API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/token")]
    [Produces("application/json")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepository;

        public AuthenticationController(IConfiguration config, IUserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }
        
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(typeof(TokenModel), 200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<TokenModel>> CreateToken(AuthenticationModel authentication)
        {
            User user = null;
                
            switch (authentication.grant_type)
            {
                case "password":
                {
                    user = await _userRepository.ValidateUser(authentication);

                    if (user == null) return Unauthorized();

                    return Ok(BuildToken(user));
                }

                default:
                    return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [ProducesResponseType(typeof(TokenModel), 200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<TokenModel>> RegisterAndCreateToken(NewUserModel newUser)
        {
            User createdUser = await _userRepository.AddUser(newUser);
            
            if (createdUser == null)
            {
                return Unauthorized();
            }

            return Ok(BuildToken(createdUser));
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

        private TokenModel BuildToken(User user)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            ClaimsIdentity identityClaims = BuildClaims(user);
            DateTime expires = DateTime.Now.AddMinutes(30);
            JwtSecurityToken token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], identityClaims.Claims,
                expires: expires, signingCredentials: creds);

            return new TokenModel
            {
                access_token = new JwtSecurityTokenHandler().WriteToken(token),
                expires_in = "1800",
            };
        }

        private static ClaimsIdentity BuildClaims(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.EmailAddress),
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");

            // claimsIdentity.AddClaims(user.UserRoles.Select(x => new Claim(ClaimTypes.Role, x.Role.Name)));

            return claimsIdentity;
        }
    }
}
