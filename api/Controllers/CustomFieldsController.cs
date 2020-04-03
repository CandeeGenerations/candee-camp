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
    public class CustomFieldsController : Controller
    {
        private readonly ICustomFieldRepository _customFieldRepository;

        public CustomFieldsController(ICustomFieldRepository customFieldRepository)
        {
            _customFieldRepository = customFieldRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CustomField>), 200)]
        public async Task<ActionResult<IEnumerable<CustomField>>> GetCustomFields(int portalId)
        {
            IEnumerable<CustomField> customFields = await _customFieldRepository.GetCustomFields(portalId);

            return Ok(customFields);
        }

        [HttpGet("{customFieldId}")]
        [ProducesResponseType(typeof(CustomField), 200)]
        public async Task<ActionResult<CustomField>> GetCustomField(int portalId, int customFieldId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CustomField customField = await _customFieldRepository.GetCustomFieldById(portalId, customFieldId);

            return Ok(customField);
        }

        [HttpPost]
        [ProducesResponseType(typeof(CustomField), 200)]
        public async Task<ActionResult<CustomField>> CreateCustomField(int portalId,
            [FromBody] CustomFieldModel customField)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CustomField newCustomField = await _customFieldRepository.CreateCustomField(portalId, customField);

            return Ok(newCustomField);
        }

        [HttpPut("{customFieldId}")]
        [ProducesResponseType(typeof(CustomField), 200)]
        public async Task<ActionResult<CustomField>> CreateCustomField(int portalId, int customFieldId,
            [FromBody] CustomFieldModel customField)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CustomField updatedCustomField =
                await _customFieldRepository.UpdateCustomField(portalId, customFieldId, customField);

            return Ok(updatedCustomField);
        }

        [HttpDelete("{customFieldId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCustomField(int portalId, int customFieldId)
        {
            await _customFieldRepository.DeleteCustomField(portalId, customFieldId);

            return Ok();
        }

        [HttpPost("reorder")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> ReorderCustomFields(int portalId, int sourceId, int targetId)
        {
            await _customFieldRepository.ReorderCustomFields(portalId, sourceId, targetId);

            return Ok();
        }
    }
}