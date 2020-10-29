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
    [Route("api/{portalId}/snack-shop-items")]
    [Produces("application/json")]
    public class SnackShopItemsController : Controller
    {
        private readonly ISnackShopItemRepository _snackShopItemRepository;

        public SnackShopItemsController(ISnackShopItemRepository snackShopItemRepository)
        {
            _snackShopItemRepository = snackShopItemRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SnackShopItem>), 200)]
        public async Task<ActionResult<IEnumerable<SnackShopItem>>> GetSnackShopItems(int portalId,
            SnackShopItemFilterModel filters = null)
        {
            IEnumerable<SnackShopItem> snackShopItems =
                await _snackShopItemRepository.GetSnackShopItems(portalId, filters);

            return Ok(snackShopItems);
        }

        [HttpGet("{snackShopItemId}")]
        [ProducesResponseType(typeof(SnackShopItem), 200)]
        public async Task<ActionResult<SnackShopItem>> GetSnackShopItem(int portalId, int snackShopItemId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopItem snackShopItem =
                await _snackShopItemRepository.GetSnackShopItemById(portalId, snackShopItemId);

            return Ok(snackShopItem);
        }

        [HttpPost]
        [ProducesResponseType(typeof(SnackShopItem), 200)]
        public async Task<ActionResult<SnackShopItem>> CreateSnackShopItem(int portalId,
            [FromBody] SnackShopItemModel snackShopItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopItem newSnackShopItem =
                await _snackShopItemRepository.CreateSnackShopItem(portalId, snackShopItem);

            return Ok(newSnackShopItem);
        }

        [HttpPut("{snackShopItemId}")]
        [ProducesResponseType(typeof(SnackShopItem), 200)]
        public async Task<ActionResult<SnackShopItem>> UpdateSnackShopItem(int portalId, int snackShopItemId,
            [FromBody] SnackShopItemModel snackShopItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SnackShopItem updatedSnackShopItem =
                await _snackShopItemRepository.UpdateSnackShopItem(portalId, snackShopItemId, snackShopItem);

            return Ok(updatedSnackShopItem);
        }

        [HttpDelete("{snackShopItemId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteSnackShopItem(int portalId, int snackShopItemId)
        {
            await _snackShopItemRepository.DeleteSnackShopItem(portalId, snackShopItemId);

            return Ok();
        }
    }
}