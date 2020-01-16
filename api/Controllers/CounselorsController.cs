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
    public class CounselorsController : Controller
    {
        private readonly ICounselorRepository _counselorRepository;

        public CounselorsController(ICounselorRepository counselorRepository)
        {
            _counselorRepository = counselorRepository;
        }
        
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Counselor>), 200)]

        public async Task<ActionResult<IEnumerable<Counselor>>> GetCounselors()
        {
            IEnumerable<Counselor> counselors = await _counselorRepository.GetCounselors();

            return Ok(counselors);
        }

        [HttpGet("{counselorId}")]
        [ProducesResponseType(typeof(Counselor), 200)]
        public async Task<ActionResult<Counselor>> GetCounselor(int counselorId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Counselor counselor = await _counselorRepository.GetCounselorById(counselorId);

            return Ok(counselor);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Counselor), 200)]
        public async Task<ActionResult<Counselor>> CreateCounselor([FromBody]CounselorModel counselor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Counselor newCounselor = await _counselorRepository.CreateCounselor(counselor);

            return Ok(newCounselor);
        }

        [HttpPut("{counselorId}")]
        [ProducesResponseType(typeof(Counselor), 200)]
        public async Task<ActionResult<Counselor>> UpdateCounselor(int counselorId, [FromBody]CounselorModel counselor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Counselor updatedCounselor = await _counselorRepository.UpdateCounselor(counselorId, counselor);

            return Ok(updatedCounselor);
        }

        [HttpDelete("{counselorId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCounselor(int counselorId)
        {
            await _counselorRepository.DeleteCounselor(counselorId);

            return Ok();
        }
    }
}