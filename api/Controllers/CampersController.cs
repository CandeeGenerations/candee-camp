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
    public class CampersController : Controller
    {
        private readonly ICamperRepository _camperRepository;

        public CampersController(ICamperRepository camperRepository)
        {
            _camperRepository = camperRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<Camper>>> GetCampers()
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampers();

            return Ok(campers);
        }

        [HttpGet("{camperId}")]
        [ProducesResponseType(typeof(Camper), 200)]
        public async Task<ActionResult<Camper>> GetCamper(int camperId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Camper camper = await _camperRepository.GetCamperById(camperId);

            return Ok(camper);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Camper), 200)]
        public async Task<ActionResult<Camper>> CreateCamper([FromBody]CamperModel camper)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Camper newCamper = await _camperRepository.CreateCamper(camper);

            return Ok(newCamper);
        }

        [HttpPut("{camperId}")]
        [ProducesResponseType(typeof(Camper), 200)]
        public async Task<ActionResult<Camper>> UpdateCamper(int camperId, [FromBody]CamperModel camper)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Camper updatedCamper = await _camperRepository.UpdateCamper(camperId, camper);

            return Ok(updatedCamper);
        }

        [HttpDelete("{camperId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCamper(int camperId)
        {
            await _camperRepository.DeleteCamper(camperId);

            return Ok();
        }
    }
} 