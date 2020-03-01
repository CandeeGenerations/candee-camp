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
    public class CustomFieldsController : Controller
    {
        private readonly ICustomFieldRepository _customFieldRepository;

        public CustomFieldsController(ICustomFieldRepository customFieldRepository)
        {
            _customFieldRepository = customFieldRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CustomField>), 200)]
        public async Task<ActionResult<IEnumerable<CustomField>>> GetCustomFields()
        {
            IEnumerable<CustomField> customFields = await _customFieldRepository.GetCustomFields();

            return Ok(customFields);
        }

        [HttpGet("{customFieldId}")]
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
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteCustomField(int customFieldId)
        {
            await _customFieldRepository.DeleteCustomField(customFieldId);

            return Ok();
        }
    }
}