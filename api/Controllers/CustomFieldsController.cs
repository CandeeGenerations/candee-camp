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
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CustomFieldsController : Controller
    {
        private readonly ICustomFieldRepository _customFieldRepository;

        public CustomFieldsController(ICustomFieldRepository customFieldRepository)
        {
            _customFieldRepository = customFieldRepository;
        }

        [HttpGet]
        [Authorize(Policy = CampPolicies.PortalOrRegistrations)]
        [ProducesResponseType(typeof(IEnumerable<CustomField>), 200)]
        public async Task<ActionResult<IEnumerable<CustomField>>> GetCustomFields()
        {
            IEnumerable<CustomField> customFields = await _customFieldRepository.GetCustomFields();

            return Ok(customFields);
        }

        [HttpGet("{customFieldId}")]
        [Authorize(Policy = CampPolicies.PortalOrRegistrations)]
        [ProducesResponseType(typeof(CustomField), 200)]
        public async Task<ActionResult<CustomField>> GetCustomField(int customFieldId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            CustomField customField = await _customFieldRepository.GetCustomFieldById(customFieldId);

            return Ok(customField);
        }

        [HttpPost]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(typeof(CustomField), 200)]
        public async Task<ActionResult<CustomField>> CreateCustomField([FromBody] CustomFieldModel customField)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            CustomField newCustomField = await _customFieldRepository.CreateCustomField(customField);

            return Ok(newCustomField);
        }

        [HttpPut("{customFieldId}")]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(typeof(CustomField), 200)]
        public async Task<ActionResult<CustomField>> CreateCustomField(int customFieldId,
            [FromBody] CustomFieldModel customField)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CustomField updatedCustomField = await _customFieldRepository.UpdateCustomField(customFieldId, customField);

            return Ok(updatedCustomField);
        }

        [HttpDelete("{customFieldId}")]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCustomField(int customFieldId)
        {
            await _customFieldRepository.DeleteCustomField(customFieldId);

            return Ok();
        }

        [HttpPost("reorder")]
        [Authorize(Policy = CampPolicies.Portal)]
        [ProducesResponseType(200)]
        public async Task<ActionResult> ReorderCustomFields(int sourceId, int targetId)
        {
            await _customFieldRepository.ReorderCustomFields(sourceId, targetId);

            return Ok();
        }
    }
}