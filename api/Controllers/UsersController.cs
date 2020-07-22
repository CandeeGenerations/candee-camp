using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reclaimed.API.Common;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(Policy = CampPolicies.SamePortal)]
    [Route("api/{portalId}/[controller]")]
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
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(int portalId, UserFilterModel filters = null)
        {
            IEnumerable<User> users = await _userRepository.GetUsers(portalId, filters);

            return Ok(users);
        }

        [HttpGet("by-ids")]
        [ProducesResponseType(typeof(IEnumerable<User>), 200)]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByIds(int portalId, IEnumerable<int> userIds)
        {
            IEnumerable<User> users = await _userRepository.GetUsersByIds(portalId, userIds);

            return Ok(users);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> GetUser(int portalId, int userId)
        {
            User user = await _userRepository.GetUserByIdPortalId(portalId, userId);

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> CreateUser(int portalId, [FromBody] NewUserModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User newUser = await _userRepository.CreateUser(portalId, user);

            return Ok(newUser);
        }

        [HttpPut("{userId}")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> UpdateUser(int portalId, int userId, [FromBody] UserModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User updatedUser = await _userRepository.UpdateUser(portalId, userId, user);

            return Ok(updatedUser);
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteUser(int portalId, int userId)
        {
            await _userRepository.DeleteUser(portalId, userId);

            return Ok();
        }

        [HttpPost("{userId}/change-password")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<ActionResult<User>> ChangePassword(int portalId, int userId, string password)
        {
            User user = await _userRepository.ChangePassword(portalId, userId, password);

            return Ok(user);
        }
    }
}