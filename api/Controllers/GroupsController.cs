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
    public class GroupsController : Controller
    {
        private readonly IGroupRepository _groupRepository;

        public GroupsController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Group>), 200)]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            IEnumerable<Group> groups = await _groupRepository.GetGroups();

            return Ok(groups);
        }

        [HttpGet("{groupId}")]
        [ProducesResponseType(typeof(Group), 200)]
        public async Task<ActionResult<Group>> GetGroup(int groupId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Group group = await _groupRepository.GetGroupById(groupId);

            return Ok(group);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Group), 200)]
        public async Task<ActionResult<Group>> CreateGroup([FromBody]GroupModel group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group newGroup = await _groupRepository.CreateGroup(group);

            return Ok(newGroup);
        }

        [HttpPut("{groupId}")]
        [ProducesResponseType(typeof(Group), 200)]
        public async Task<ActionResult<Group>> UpdateGroup(int groupId, [FromBody]GroupModel group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group updatedGroup = await _groupRepository.UpdateGroup(groupId, group);

            return Ok(updatedGroup);
        }

        [HttpDelete("{groupId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteGroup(int groupId)
        {
            await _groupRepository.DeleteGroup(groupId);

            return Ok();
        }
    }
} 