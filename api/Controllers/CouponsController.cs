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
    [Route("api/[controller]")]
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
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
        {
            IEnumerable<Coupon> coupons = await _couponRepository.GetCoupons();

            return Ok(coupons);
        }

        [HttpGet("{couponId}")]
        [ProducesResponseType(typeof(Coupon), 200)]
        public async Task<ActionResult<Coupon>> GetCoupon(int couponId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon coupon = await _couponRepository.GetCouponById(couponId);

            return Ok(coupon);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Coupon), 200)]
        public async Task<ActionResult<Coupon>> CreateCoupon([FromBody] CouponModel coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon newCoupon = await _couponRepository.CreateCoupon(coupon);

            return Ok(newCoupon);
        }

        [HttpPut("{couponId}")]
        [ProducesResponseType(typeof(Coupon), 200)]
        public async Task<ActionResult<Coupon>> UpdateCoupon(int couponId, [FromBody] CouponModel coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon updatedCoupon = await _couponRepository.UpdateCoupon(couponId, coupon);

            return Ok(updatedCoupon);
        }

        [HttpDelete("{couponId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCoupon(int couponId)
        {
            await _couponRepository.DeleteCoupon(couponId);

            return Ok();
        }
    }
}