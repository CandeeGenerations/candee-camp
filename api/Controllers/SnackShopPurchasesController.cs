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
    [Authorize(Policy = CampPolicies.Portal)]
    [Route("api/snack-shop-purchases")]
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
        public async Task<ActionResult<IEnumerable<SnackShopPurchase>>> GetSnackShopPurchases(int sourceId,
            SnackShopPurchaseSource source)
        {
            IEnumerable<SnackShopPurchase> snackShopPurchases =
                await _snackShopPurchaseRepository.GetSnackShopPurchases(sourceId, source);

            return Ok(snackShopPurchases);
        }

        [HttpGet("{sourceId}/{snackShopPurchaseId}")]
        [ProducesResponseType(typeof(SnackShopPurchase), 200)]
        public async Task<ActionResult<SnackShopPurchase>> GetSnackShopItem(int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopPurchase snackShopPurchase =
                await _snackShopPurchaseRepository.GetSnackShopPurchaseById(sourceId, snackShopPurchaseId, source);

            return Ok(snackShopPurchase);
        }

        [HttpPost("{sourceId}")]
        [ProducesResponseType(typeof(SnackShopPurchase), 200)]
        public async Task<ActionResult<SnackShopPurchase>> CreateSnackShopItem(int sourceId,
            [FromBody] SnackShopPurchaseModel snackShopPurchase, SnackShopPurchaseSource source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopPurchase newSnackShopPurchase =
                await _snackShopPurchaseRepository.CreateSnackShopPurchase(sourceId, source, snackShopPurchase);

            return Ok(newSnackShopPurchase);
        }

        [HttpPut("{sourceId}/{snackShopPurchaseId}")]
        [ProducesResponseType(typeof(SnackShopPurchase), 200)]
        public async Task<ActionResult<SnackShopPurchase>> UpdateSnackShopItem(int sourceId, int snackShopPurchaseId,
            [FromBody] SnackShopPurchaseModel snackShopPurchase, SnackShopPurchaseSource source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopPurchase updatedSnackShopPurchase =
                await _snackShopPurchaseRepository.UpdateSnackShopPurchase(sourceId, snackShopPurchaseId, source,
                    snackShopPurchase);

            return Ok(updatedSnackShopPurchase);
        }

        [HttpDelete("{sourceId}/{snackShopPurchaseId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteSnackShopItem(int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            await _snackShopPurchaseRepository.DeleteSnackShopPurchase(sourceId, snackShopPurchaseId, source);

            return Ok();
        }
    }
}