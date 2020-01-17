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
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class SettingsController : Controller
    {
        private readonly ISettingRepository _settingRepository;

        public SettingsController(ISettingRepository settingRepository)
        {
            _settingRepository = settingRepository;
        }
        
        [HttpGet]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(typeof(IEnumerable<Setting>), 200)]
        public async Task<ActionResult<IEnumerable<Setting>>> GetSettings()
        {
            IEnumerable<Setting> settings = await _settingRepository.GetSettings();

            return Ok(settings);
        }
        
        [HttpGet("{key}")]
        [Authorize(Policy = CampPolicies.PortalOrRegistrations)]
        [ProducesResponseType(typeof(Setting), 200)]
        public async Task<ActionResult<Setting>> GetSetting(SettingKey key)
        {
            Setting setting = await _settingRepository.GetSettingByKey(key);

            return Ok(setting);
        }
        
        [HttpPut("{key}")]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(typeof(Setting), 200)]
        public async Task<ActionResult<Setting>> UpdateSetting(SettingKey key, string value)
        {
            Setting setting = await _settingRepository.UpdateSetting(key, value);

            return Ok(setting);
        }

        [HttpPut("multiple")]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(typeof(IEnumerable<Setting>), 200)]
        public async Task<ActionResult<IEnumerable<Setting>>> UpdateMultipleSettings(
            [FromBody] IEnumerable<SettingModel> settings)
        {
            IEnumerable<Setting> updatedSettings = await _settingRepository.UpdateSettings(settings);

            return Ok(updatedSettings);
        }
    }
}