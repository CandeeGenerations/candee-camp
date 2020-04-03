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
    public class CouponsController : Controller
    {
        private readonly ICouponRepository _couponRepository;

        public CouponsController(ICouponRepository couponRepository)
        {
            _couponRepository = couponRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Coupon>), 200)]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons(int portalId)
        {
            IEnumerable<Coupon> coupons = await _couponRepository.GetCoupons(portalId);

            return Ok(coupons);
        }

        [HttpGet("{couponId}")]
        [ProducesResponseType(typeof(Coupon), 200)]
        public async Task<ActionResult<Coupon>> GetCoupon(int portalId, int couponId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon coupon = await _couponRepository.GetCouponById(portalId, couponId);

            return Ok(coupon);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Coupon), 200)]
        public async Task<ActionResult<Coupon>> CreateCoupon(int portalId, [FromBody] CouponModel coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon newCoupon = await _couponRepository.CreateCoupon(portalId, coupon);

            return Ok(newCoupon);
        }

        [HttpPut("{couponId}")]
        [ProducesResponseType(typeof(Coupon), 200)]
        public async Task<ActionResult<Coupon>> UpdateCoupon(int portalId, int couponId, [FromBody] CouponModel coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon updatedCoupon = await _couponRepository.UpdateCoupon(portalId, couponId, coupon);

            return Ok(updatedCoupon);
        }

        [HttpDelete("{couponId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCoupon(int portalId, int couponId)
        {
            await _couponRepository.DeleteCoupon(portalId, couponId);

            return Ok();
        }
    }
}