using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class NotificationRepository : BaseRepository, INotificationRepository
    {
        public NotificationRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Notification>> GetNotifications(int portalId) =>
            await Context.Notifications.Where(x => x.PortalId == portalId && !x.IsDeleted).ToListAsync();

        public async Task<Notification> GetNotificationById(int portalId, int notificationId)
        {
            Notification dbNotification =
                await Context.Notifications.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == notificationId && !x.IsDeleted);

            if (dbNotification == null)
            {
                throw new Exception("This notification does not exist.");
            }

            return dbNotification;
        }

        public async Task<IEnumerable<Notification>> GetNotificationsByName(int portalId, string name) => await Context.Notifications
            .Where(x => x.PortalId == portalId && !x.IsDeleted &&
                        string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<Notification> CreateNotification(int portalId, NotificationModel notification)
        {
            IEnumerable<Notification> existingNotifications = await GetNotificationsByName(portalId, notification.Name);

            if (existingNotifications.Any())
            {
                throw new Exception("This notification already exists. Please use another name.");
            }

            Notification newNotification = new Notification
            {
                PortalId = portalId,
                Name = notification.Name.Trim(),
                CreatedBy = notification.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false,
                UpdatedDate = DateTimeOffset.Now
            };

            await Context.Notifications.AddAsync(newNotification);
            await Context.SaveChangesAsync();

            return newNotification;
        }

        public async Task DeleteNotification(int portalId, int notificationId)
        {
            Notification dbNotification = await GetNotificationById(portalId, notificationId);

            dbNotification.IsActive = false;
            dbNotification.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Notification> UpdateNotification(int portalId, int notificationId, NotificationModel notification)
        {
            Notification dbNotification = await GetNotificationById(portalId, notificationId);

            if (!string.Equals(dbNotification.Name, notification.Name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<Notification> existingNotifications = await GetNotificationsByName(portalId, notification.Name);

                if (existingNotifications.Any())
                {
                    throw new Exception("This notification already exists. Please use another name.");
                }
            }

            dbNotification.Name = notification.Name;
            dbNotification.IsActive = notification.IsActive;
            dbNotification.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbNotification;
        }
    }
}