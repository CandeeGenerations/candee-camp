using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetNotifications(int portalId);
        Task<Notification> GetNotificationById(int portalId, int notificationId);
        Task<IEnumerable<Notification>> GetNotificationsByName(int portalId, string name);
        Task<Notification> CreateNotification(int portalId, NotificationModel notification);
        Task DeleteNotification(int portalId, int notificationId);
        Task<Notification> UpdateNotification(int portalId, int NotificationId, NotificationModel notification);
    }
}