using System;
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
    [Authorize(Policy = CampPolicies.Portal)]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CampersController : Controller
    {
        private readonly ICamperRepository _camperRepository;
        private readonly ICustomFieldRepository _customFieldRepository;
        private readonly IRedeemedCouponRepository _redeemedCouponRepository;
        private readonly ICamperCustomFieldRepository _camperCustomFieldRepository;

        public CampersController(ICamperRepository camperRepository, IRedeemedCouponRepository redeemedCouponRepository,
            ICustomFieldRepository customFieldRepository, ICamperCustomFieldRepository camperCustomFieldRepository)
        {
            _camperRepository = camperRepository;
            _customFieldRepository = customFieldRepository;
            _redeemedCouponRepository = redeemedCouponRepository;
            _camperCustomFieldRepository = camperCustomFieldRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<AdjustedCamper>>> GetCampers()
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampers();
            List<AdjustedCamper> adjustedCampers = new List<AdjustedCamper>();

            foreach (Camper camper in campers)
            {
                adjustedCampers.Add(await AdjustCamper(camper));
            }

            return Ok(adjustedCampers);
        }

        [HttpGet("by-ids")]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<AdjustedCamper>>> GetCampersByIds(IEnumerable<int> camperIds)
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampersByIds(camperIds);
            List<AdjustedCamper> adjustedCampers = new List<AdjustedCamper>();

            foreach (Camper camper in campers)
            {
                adjustedCampers.Add(await AdjustCamper(camper));
            }
            
            return Ok(adjustedCampers);
        }
        
        [HttpGet("for-registration")]
        [ProducesResponseType(typeof(IEnumerable<Camper>), 200)]
        public async Task<ActionResult<IEnumerable<AdjustedCamper>>> GetEventsForRegistration(int? currentCamperId)
        {
            IEnumerable<Camper> campers = await _camperRepository.GetCampersForRegistration(currentCamperId);
            List<AdjustedCamper> adjustedCampers = new List<AdjustedCamper>();

            foreach (Camper camper in campers)
            {
                adjustedCampers.Add(await AdjustCamper(camper));
            }
            
            return Ok(adjustedCampers);
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

            try
            {
                await ValidateCustomFields(camper.CustomFields);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            Camper newCamper = await _camperRepository.CreateCamper(camper);

            if (camper.CouponId != null)
            {
                await _redeemedCouponRepository.RedeemCoupon(camper.CouponId.Value, newCamper.Id);
            }

            await SaveCustomFields(newCamper.Id, camper.CustomFields);
            
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

            try
            {
                await ValidateCustomFields(camper.CustomFields);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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

            await SaveCustomFields(camperId, camper.CustomFields);

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

            IEnumerable<CamperCustomField> camperCustomFields =
                await _camperCustomFieldRepository.GetCamperCustomFields(camper.Id);

            adjustedCamper.CustomFields = camperCustomFields;

            return adjustedCamper;
        }

        private async Task ValidateCustomFields(IEnumerable<CamperCustomFieldModel> camperCustomFields)
        {
            foreach (CamperCustomFieldModel camperCustomField in camperCustomFields.Where(x =>
                string.IsNullOrEmpty(x.Value)))
            {
                CustomField customField =
                    await _customFieldRepository.GetCustomFieldById(camperCustomField.CustomFieldId);

                if (customField.Required)
                {
                    throw new Exception($"The field {customField.Name} is required.");
                }
            }
        }

        private async Task SaveCustomFields(int camperId, List<CamperCustomFieldModel> camperCustomFields)
        {
            if (camperCustomFields.Any())
            {
                foreach (CamperCustomFieldModel camperCustomField in camperCustomFields)
                {
                    await _camperCustomFieldRepository.SaveCamperCustomField(camperId, camperCustomField.CustomFieldId,
                        camperCustomField.Value);
                }
            }
        }
    }
} 