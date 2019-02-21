using CandeeCamp.Core.Domain.DomainObjects;
using CandeeCamp.Core.Domain.Models;
using CandeeCamp.Core.Repository.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.Core.Api.Controllers
{
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/v{ver:apiVersion}/[controller]")]
    [Produces("application/json")]
    public class UsersController : Controller
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        /// <summary>
        /// Adds a User to the Database.
        /// </summary>
        /// <remarks>
        /// Sample Request:
        ///
        ///     POST /api/v1/users
        ///     {
        ///         "username": "cgen01",
        ///         "firstName": "Tyler",
        ///         "lastName": "Candee",
        ///         "password": "abc123!",
        ///         "email": "tyler@candeegenerations.com"
        ///     }
        /// 
        /// </remarks>
        /// <param name="user"></param>
        /// <returns>A New User Object.</returns>
        /// <response code="200">Returns the Result Object with the New User Object Included</response>
        [HttpPost]
        [ProducesResponseType(typeof(ResultModel<User>), 200)]
        public IActionResult AddUser([FromBody] NewUserModel user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newUser = _usersRepository.AddUser(user);

            return Ok(new ResultModel<User>(newUser));
        }
    }
}