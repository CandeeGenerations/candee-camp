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
    [Route("api/[controller]/{portalId}")]
    [Produces("application/json")]
    public class CabinsController : Controller
    {
        private readonly ICabinRepository _cabinRepository;

        public CabinsController(ICabinRepository cabinRepository)
        {
            _cabinRepository = cabinRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Cabin>), 200)]
        public async Task<ActionResult<IEnumerable<Cabin>>> GetCabins(int portalId)
        {
            IEnumerable<Cabin> cabins = await _cabinRepository.GetCabins(portalId);

            return Ok(cabins);
        }

        [HttpGet("{cabinId}")]
        [ProducesResponseType(typeof(Cabin), 200)]
        public async Task<ActionResult<Cabin>> GetCabin(int portalId, int cabinId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cabin cabin = await _cabinRepository.GetCabinById(portalId, cabinId);

            return Ok(cabin);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Cabin), 200)]
        public async Task<ActionResult<Cabin>> CreateCabin(int portalId, [FromBody] CabinModel cabin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cabin newCabin = await _cabinRepository.CreateCabin(portalId, cabin);

            return Ok(newCabin);
        }

        [HttpPut("{cabinId}")]
        [ProducesResponseType(typeof(Cabin), 200)]
        public async Task<ActionResult<Cabin>> UpdateCabin(int portalId, int cabinId, [FromBody] CabinModel cabin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cabin updatedCabin = await _cabinRepository.UpdateCabin(portalId, cabinId, cabin);

            return Ok(updatedCabin);
        }

        [HttpDelete("{cabinId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCabin(int portalId, int cabinId)
        {
            await _cabinRepository.DeleteCabin(portalId, cabinId);

            return Ok();
        }
    }
}