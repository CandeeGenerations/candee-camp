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
    public class CabinsController : Controller
    {
        private readonly ICabinRepository _cabinRepository;

        public CabinsController(ICabinRepository cabinRepository)
        {
            _cabinRepository = cabinRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Cabin>), 200)]
        public async Task<ActionResult<IEnumerable<Cabin>>> GetCabins()
        {
            IEnumerable<Cabin> cabins = await _cabinRepository.GetCabins();

            return Ok(cabins);
        }

        [HttpGet("{cabinId}")]
        [ProducesResponseType(typeof(Cabin), 200)]
        public async Task<ActionResult<Cabin>> GetCabin(int cabinId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cabin cabin = await _cabinRepository.GetCabinById(cabinId);

            return Ok(cabin);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Cabin), 200)]
        public async Task<ActionResult<Cabin>> CreateCabin([FromBody] CabinModel cabin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cabin newCabin = await _cabinRepository.CreateCabin(cabin);

            return Ok(newCabin);
        }

        [HttpPut("{cabinId}")]
        [ProducesResponseType(typeof(Cabin), 200)]
        public async Task<ActionResult<Cabin>> UpdateCabin(int cabinId, [FromBody] CabinModel cabin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Cabin updatedCabin = await _cabinRepository.UpdateCabin(cabinId, cabin);

            return Ok(updatedCabin);
        }

        [HttpDelete("{cabinId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCabin(int cabinId)
        {
            await _cabinRepository.DeleteCabin(cabinId);

            return Ok();
        }
    }
}