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
    [Route("api/{portalId}/snack-shop-purchases")]
    [Produces("application/json")]
    public class SnackShopPurchasesController : Controller
    {
        private readonly ISnackShopPurchaseRepository _snackShopPurchaseRepository;

        public SnackShopPurchasesController(ISnackShopPurchaseRepository snackShopPurchaseRepository)
        {
            _snackShopPurchaseRepository = snackShopPurchaseRepository;
        }

        [HttpGet("{sourceId}")]
        [ProducesResponseType(typeof(IEnumerable<SnackShopPurchase>), 200)]
        public async Task<ActionResult<IEnumerable<SnackShopPurchase>>> GetSnackShopPurchases(int portalId,
            int sourceId,
            SnackShopPurchaseSource source)
        {
            IEnumerable<SnackShopPurchase> snackShopPurchases =
                await _snackShopPurchaseRepository.GetSnackShopPurchases(portalId, sourceId, source);

            return Ok(snackShopPurchases);
        }

        [HttpGet("{sourceId}/{snackShopPurchaseId}")]
        [ProducesResponseType(typeof(SnackShopPurchase), 200)]
        public async Task<ActionResult<SnackShopPurchase>> GetSnackShopItem(int portalId, int sourceId,
            int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopPurchase snackShopPurchase =
                await _snackShopPurchaseRepository.GetSnackShopPurchaseById(portalId, sourceId, snackShopPurchaseId,
                    source);

            return Ok(snackShopPurchase);
        }

        [HttpPost("{sourceId}")]
        [ProducesResponseType(typeof(SnackShopPurchase), 200)]
        public async Task<ActionResult<SnackShopPurchase>> CreateSnackShopItem(int portalId, int sourceId,
            [FromBody] SnackShopPurchaseModel snackShopPurchase, SnackShopPurchaseSource source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopPurchase newSnackShopPurchase =
                await _snackShopPurchaseRepository.CreateSnackShopPurchase(portalId, sourceId, source,
                    snackShopPurchase);

            return Ok(newSnackShopPurchase);
        }

        [HttpPut("{sourceId}/{snackShopPurchaseId}")]
        [ProducesResponseType(typeof(SnackShopPurchase), 200)]
        public async Task<ActionResult<SnackShopPurchase>> UpdateSnackShopItem(int portalId, int sourceId,
            int snackShopPurchaseId,
            [FromBody] SnackShopPurchaseModel snackShopPurchase, SnackShopPurchaseSource source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopPurchase updatedSnackShopPurchase =
                await _snackShopPurchaseRepository.UpdateSnackShopPurchase(portalId, sourceId, snackShopPurchaseId,
                    source,
                    snackShopPurchase);

            return Ok(updatedSnackShopPurchase);
        }

        [HttpDelete("{sourceId}/{snackShopPurchaseId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteSnackShopItem(int portalId, int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            await _snackShopPurchaseRepository.DeleteSnackShopPurchase(portalId, sourceId, snackShopPurchaseId, source);

            return Ok();
        }
    }
}