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
    [Route("api/{portalId}/[controller]")]
    [Produces("application/json")]
    public class CounselorsController : Controller
    {
        private readonly ICounselorRepository _counselorRepository;

        public CounselorsController(ICounselorRepository counselorRepository)
        {
            _counselorRepository = counselorRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Counselor>), 200)]
        public async Task<ActionResult<IEnumerable<Counselor>>> GetCounselors(int portalId,
            CounselorFilterModel filters = null)
        {
            IEnumerable<Counselor> counselors = await _counselorRepository.GetCounselors(portalId, filters);

            return Ok(counselors);
        }

        [HttpGet("{counselorId}")]
        [ProducesResponseType(typeof(Counselor), 200)]
        public async Task<ActionResult<Counselor>> GetCounselor(int portalId, int counselorId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Counselor counselor = await _counselorRepository.GetCounselorById(portalId, counselorId);

            return Ok(counselor);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Counselor), 200)]
        public async Task<ActionResult<Counselor>> CreateCounselor(int portalId, [FromBody] CounselorModel counselor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Counselor newCounselor = await _counselorRepository.CreateCounselor(portalId, counselor);

            return Ok(newCounselor);
        }

        [HttpPut("{counselorId}")]
        [ProducesResponseType(typeof(Counselor), 200)]
        public async Task<ActionResult<Counselor>> UpdateCounselor(int portalId, int counselorId,
            [FromBody] CounselorModel counselor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Counselor updatedCounselor = await _counselorRepository.UpdateCounselor(portalId, counselorId, counselor);

            return Ok(updatedCounselor);
        }

        [HttpDelete("{counselorId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCounselor(int portalId, int counselorId)
        {
            await _counselorRepository.DeleteCounselor(portalId, counselorId);

            return Ok();
        }
    }
}