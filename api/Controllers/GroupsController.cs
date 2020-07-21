using System.Collections.Generic;
using System.Linq;
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
    public class GroupsController : Controller
    {
        private readonly IGroupRepository _groupRepository;
        private readonly ICamperRepository _camperRepository;

        public GroupsController(IGroupRepository groupRepository, ICamperRepository camperRepository)
        {
            _groupRepository = groupRepository;
            _camperRepository = camperRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Group>), 200)]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups(int portalId)
        {
            IEnumerable<Group> groups = await _groupRepository.GetGroups(portalId);

            return Ok(groups);
        }

        [HttpGet("{groupId}")]
        [ProducesResponseType(typeof(AdjustedGroup), 200)]
        public async Task<ActionResult<AdjustedGroup>> GetGroup(int portalId, int groupId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group group = await _groupRepository.GetGroupById(portalId, groupId);
            AdjustedGroup adjustedGroup = await AdjustGroup(group);

            return Ok(adjustedGroup);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Group), 200)]
        public async Task<ActionResult<Group>> CreateGroup(int portalId, [FromBody] GroupModel group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group newGroup = await _groupRepository.CreateGroup(portalId, group);

            return Ok(newGroup);
        }

        [HttpPut("{groupId}")]
        [ProducesResponseType(typeof(AdjustedGroup), 200)]
        public async Task<ActionResult<AdjustedGroup>> UpdateGroup(int portalId, int groupId, [FromBody] GroupModel group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group updatedGroup = await _groupRepository.UpdateGroup(portalId, groupId, group);
            AdjustedGroup adjustedGroup = await AdjustGroup(updatedGroup);

            return Ok(adjustedGroup);
        }

        [HttpDelete("{groupId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteGroup(int portalId, int groupId)
        {
            await _groupRepository.DeleteGroup(portalId, groupId);

            return Ok();
        }
        
        private async Task<AdjustedGroup> AdjustGroup(Group group)
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampersByGroup(group.PortalId, group.Id);
            AdjustedGroup adjustedGroup = new AdjustedGroup(group);

            if (campers.Any())
            {
                adjustedGroup.Campers = campers.Select(x => x.Id).ToArray();
            }

            return adjustedGroup;
        }
    }
}