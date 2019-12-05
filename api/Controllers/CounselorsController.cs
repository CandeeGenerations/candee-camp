using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.API.Controllers
{
    [ApiVersion("1.0")]
    [Authorize]
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
    }
}