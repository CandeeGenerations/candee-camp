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
    public class NotificationsController : Controller
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationsController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Notification>), 200)]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications(int portalId)
        {
            IEnumerable<Notification> notifications = await _notificationRepository.GetNotifications(portalId);

            return Ok(notifications);
        }

        [HttpGet("{notificationId}")]
        [ProducesResponseType(typeof(Notification), 200)]
        public async Task<ActionResult<Notification>> GetNotification(int portalId, int notificationId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Notification notification = await _notificationRepository.GetNotificationById(portalId, notificationId);

            return Ok(notification);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Notification), 200)]
        public async Task<ActionResult<Notification>> CreateNotification(int portalId, [FromBody] NotificationModel notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Notification newNotification = await _notificationRepository.CreateNotification(portalId, notification);

            return Ok(newNotification);
        }

        [HttpPut("{notificationId}")]
        [ProducesResponseType(typeof(Notification), 200)]
        public async Task<ActionResult<Notification>> UpdateNotification(int portalId, int notificationId, [FromBody] NotificationModel notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Notification updatedNotification = await _notificationRepository.UpdateNotification(portalId, notificationId, notification);

            return Ok(updatedNotification);
        }

        [HttpDelete("{notificationId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> DeleteNotification(int portalId, int notificationId)
        {
            await _notificationRepository.DeleteNotification(portalId, notificationId);

            return Ok();
        }
    }
}