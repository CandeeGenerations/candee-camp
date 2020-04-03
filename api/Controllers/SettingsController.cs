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
    [Route("api/[controller]/{portalId]")]
    [Produces("application/json")]
    public class SettingsController : Controller
    {
        private readonly ISettingRepository _settingRepository;

        public SettingsController(ISettingRepository settingRepository)
        {
            _settingRepository = settingRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Setting>), 200)]
        public async Task<ActionResult<IEnumerable<Setting>>> GetSettings(int portalId)
        {
            IEnumerable<Setting> settings = await _settingRepository.GetSettings(portalId);

            return Ok(settings);
        }

        [HttpGet("{key}")]
        [ProducesResponseType(typeof(Setting), 200)]
        public async Task<ActionResult<Setting>> GetSetting(int portalId, SettingKey key)
        {
            Setting setting = await _settingRepository.GetSettingByKey(portalId, key);

            return Ok(setting);
        }

        [HttpPut("{key}")]
        [ProducesResponseType(typeof(Setting), 200)]
        public async Task<ActionResult<Setting>> UpdateSetting(int portalId, SettingKey key, string value)
        {
            Setting setting = await _settingRepository.UpdateSetting(portalId, key, value);

            return Ok(setting);
        }

        [HttpPut("multiple")]
        [ProducesResponseType(typeof(IEnumerable<Setting>), 200)]
        public async Task<ActionResult<IEnumerable<Setting>>> UpdateMultipleSettings(int portalId,
            [FromBody] IEnumerable<SettingModel> settings)
        {
            IEnumerable<Setting> updatedSettings = await _settingRepository.UpdateSettings(portalId, settings);

            return Ok(updatedSettings);
        }
    }
}