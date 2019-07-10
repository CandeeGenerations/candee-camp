using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<User>), 200)]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            IEnumerable<User> users = await _userRepository.GetUsers();

            return Ok(users);
        }
        
        [HttpGet("{userId}")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> GetUser(int userId)
        {
            User user = await _userRepository.GetUserById(userId);

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> CreateUser([FromBody] NewUserModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User newUser = await _userRepository.CreateUser(user);

            return Ok(newUser);
        }

        [HttpPost("{userId}/change-password")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> ChangePassword(int userId, string password)
        {
            User user = await _userRepository.ChangePassword(userId, password);

            return Ok(user);
        }
    }
}