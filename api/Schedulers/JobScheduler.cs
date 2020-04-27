using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;
using Reclaimed.API.Jobs;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Repositories;
using System.Threading.Tasks;
using Reclaimed.API.Controllers;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace Reclaimed.API.Schedulers
{
    public class JobScheduler

    { 
        public static ISchedulerFactory schedFact = new StdSchedulerFactory();

        public static IScheduler scheduler = schedFact.GetScheduler().GetAwaiter().GetResult();
        public async static void Start()
        {
            scheduler.Start();

            string notifications = await GetAllNotifications();

            //string notificationList = notifications.ToString();

            //var notification = JObject.Parse(notifications);
            List<Notification> notification = JsonConvert.DeserializeObject<List<Notification>>(notifications);
            //"[{\"name\":\"fgwef\",\"createdDate\":\"2020-11-28T04:10:31+00:00\",\"updatedDate\":\"2020-11-28T04:10:31+00:00\",\"createdBy\":-1,\"stuff\":null,\"things\":null,\"again\":\"erer\",\"data\":\"33\",\"createdByUser\":null,\"portalId\":1,\"portal\":null,\"isActive\":true,\"isDeleted\":false,\"id\":1}]"
            //[{"name":"fgwef","createdDate":"2020-11-28T04:10:31+00:00","updatedDate":"2020-11-28T04:10:31+00:00","createdBy":-1,"stuff":null,"things":null,"again":"erer","data":"33","createdByUser":null,"portalId":1,"portal":null,"isActive":true,"isDeleted":false,"id":1},{"name":"tt","createdDate":"2019-11-28T04:10:31+00:00","updatedDate":"2020-11-28T04:10:31+00:00","createdBy":-1,"stuff":null,"things":null,"again":"erer","data":"33","createdByUser":null,"portalId":1,"portal":null,"isActive":true,"isDeleted":false,"id":2}]            List<Notification> test = JsonConvert.DeserializeObject<List<Notification>>(notifications);

            Console.WriteLine(notification);

            IJobDetail newJob = JobBuilder.Create<DumbJob>().Build();

            foreach (var item in notification)
            {

            }
            //IJobDetail job = JobBuilder.Create<DumbJob>()

            //ITrigger trigger = TriggerBuilder.Create()

            //    .WithIdentity("IDGJob", "IDG")

            //    .WithCronSchedule("0 0/1 * 1/1 * ? *")

            //    .StartAt(DateTime.UtcNow)

            //    .WithPriority(1)

            //    .Build();

            //scheduler.ScheduleJob(newJob, trigger);

            //Console.WriteLine("Dumb started.");

            IJobDetail job = JobBuilder.Create<HelloJob>().Build();
            IJobDetail jobd = JobBuilder.Create<DumbJob>().Build();

            ITrigger trigger2 = TriggerBuilder.Create()

                .WithIdentity("IDGJob", "IDG")

                .WithCronSchedule("0 0/1 * 1/1 * ? *")

                .StartAt(DateTime.UtcNow)

                .WithPriority(1)

                .Build();

            _ = scheduler.ScheduleJob(job, trigger2);
            _ = scheduler.ScheduleJob(jobd, trigger2);

            Console.WriteLine("IDG started.");

            Debug.WriteLine("Scheduler started.");
            Console.WriteLine("Scheduler started.");

        }

        private static async Task<String> GetAllNotifications()
        {
            string notificationList = "Empty";
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:5000/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // New code:
                HttpResponseMessage response = await client.GetAsync("api/Notifications/GetAllNotifications");
                if (response.IsSuccessStatusCode)
                {
                    notificationList = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(notificationList);
                }
            }
            //{StatusCode: 400, ReasonPhrase: 'Bad Request', Version: 1.1, Content: System.Net.Http.HttpConnectionResponseContent, Headers:{  Date: Sun, 26 Apr 2020 21:33:33 GMT  Server: Kestrel  Transfer-Encoding: chunked  Content-Type: application/json; charset=utf-8}}
            return notificationList;
        }

        public static void Stop()
        {
            scheduler.Shutdown();

            Debug.WriteLine("Scheduler shutdown.");
            Console.WriteLine("Scheduler shutdown.");
        }

        public static void Exception()
        {
            throw new Exception("Job Scheduler has errored.");
        }

    }
}
