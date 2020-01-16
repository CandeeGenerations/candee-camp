using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.Common;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize(Policy = CampPolicies.Portal)]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CampersController : Controller
    {
        private readonly ICamperRepository _camperRepository;
        private readonly IRedeemedCouponRepository _redeemedCouponRepository;

        public CampersController(ICamperRepository camperRepository, IRedeemedCouponRepository redeemedCouponRepository)
        {
            _camperRepository = camperRepository;
            _redeemedCouponRepository = redeemedCouponRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<Camper>>> GetCampers()
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampers();

            return Ok(campers);
        }

        [HttpGet("by-ids")]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<Camper>>> GetCampersByIds(IEnumerable<int> camperIds)
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampersByIds(camperIds);

            return Ok(campers);
        }
        
        [HttpGet("for-registration")]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<Camper>>> GetEventsForRegistration(int? currentCamperId)
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampersForRegistration(currentCamperId);
            
            return Ok(campers);
        }

        [HttpGet("{camperId}")]
        [ProducesResponseType(typeof(AdjustedCamper), 200)]
        public async Task<ActionResult<AdjustedCamper>> GetCamper(int camperId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Camper camper = await _camperRepository.GetCamperById(camperId);
            AdjustedCamper adjustedCamper = await AdjustCamper(camper);
            
            return Ok(adjustedCamper);
        }

        [HttpPost]
        [ProducesResponseType(typeof(AdjustedCamper), 200)]
        public async Task<ActionResult<AdjustedCamper>> CreateCamper([FromBody]CamperModel camper)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Camper newCamper = await _camperRepository.CreateCamper(camper);

            if (camper.CouponId != null)
            {
                await _redeemedCouponRepository.RedeemCoupon(camper.CouponId.Value, newCamper.Id);
            }
            
            AdjustedCamper adjustedCamper = await AdjustCamper(newCamper);
            
            return Ok(adjustedCamper);
        }

        [HttpPut("{camperId}")]
        [ProducesResponseType(typeof(AdjustedCamper), 200)]
        public async Task<ActionResult<AdjustedCamper>> UpdateCamper(int camperId, [FromBody]CamperModel camper)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Camper updatedCamper = await _camperRepository.UpdateCamper(camperId, camper);
            RedeemedCoupon camperCoupon = await _redeemedCouponRepository.GetCamperCoupon(camperId);
            
            if (camper.CouponId != null && (camperCoupon == null || camper.CouponId != camperCoupon.CouponId))
            {
                await _redeemedCouponRepository.RedeemCoupon(camper.CouponId.Value, camperId);
            } else if (camper.CouponId == null && camperCoupon != null)
            {
                await _redeemedCouponRepository.RemoveRedeemedCoupon(camperId);
            }

            AdjustedCamper adjustedCamper = await AdjustCamper(updatedCamper);
            
            return Ok(adjustedCamper);
        }

        [HttpDelete("{camperId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCamper(int camperId)
        {
            await _camperRepository.DeleteCamper(camperId);

            return Ok();
        }

        private async Task<AdjustedCamper> AdjustCamper(Camper camper)
        {
            RedeemedCoupon camperCoupon = await _redeemedCouponRepository.GetCamperCoupon(camper.Id);
            AdjustedCamper adjustedCamper = new AdjustedCamper(camper);

            if (camperCoupon != null)
            {
                adjustedCamper.CouponId = camperCoupon.CouponId;
            }

            return adjustedCamper;
        } 
    }
} 