using Newtonsoft.Json;
using Quartz;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Reclaimed.API.Jobs
{
    public class HelloJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            EmailService emailService = new EmailService();
            JobDataMap dataMap = context.JobDetail.JobDataMap;
            List<Notification> deserializedNotificationList = JsonConvert.DeserializeObject<List<Notification>>(dataMap.GetString("Addresses"));

            foreach (var item in deserializedNotificationList)
            {
                _ = emailService.sendTestEmail(item.Data);
            }

            await Console.Out.WriteLineAsync("HelloJob is executing.");

        }
    }
}
