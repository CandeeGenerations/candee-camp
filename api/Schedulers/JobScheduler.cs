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
using Reclaimed.API.Services;
using Microsoft.Extensions.Configuration;

namespace Reclaimed.API.Schedulers
{
    public class JobScheduler

    { 
        public static ISchedulerFactory schedFact = new StdSchedulerFactory();

        public static IScheduler scheduler = schedFact.GetScheduler().GetAwaiter().GetResult();
        public static EmailService emailService = new EmailService();

        public async static void Start(IConfiguration config)
        {
            scheduler.Start();

            string notifications = await GetAllNotifications(config);

            //"[{\"name\":\"fgwef\",\"createdDate\":\"2020-11-28T04:10:31+00:00\",\"updatedDate\":\"2020-11-28T04:10:31+00:00\",\"createdBy\":-1,\"stuff\":null,\"things\":null,\"again\":\"erer\",\"data\":\"33\",\"createdByUser\":null,\"portalId\":1,\"portal\":null,\"isActive\":true,\"isDeleted\":false,\"id\":1}]"

            //Console.WriteLine(deserializedNotificationList);

            IJobDetail newJob = JobBuilder.Create<DumbJob>().Build();

            IJobDetail launchEmails = JobBuilder.Create<HelloJob>()
                .WithIdentity("myJob", "group1")
                .UsingJobData("Addresses", notifications)
                .Build();

            ITrigger trigger = TriggerBuilder.Create()

                .WithIdentity("IDGTrigger", "TRIGGER")

                .WithSimpleSchedule(x => x.WithIntervalInSeconds(10))
                
                .StartAt(DateTime.UtcNow)

                .WithPriority(1)

                .Build();

            _ = scheduler.ScheduleJob(launchEmails, trigger);

            Console.WriteLine("IDG started.");

            Debug.WriteLine("Scheduler started.");
            Console.WriteLine("Scheduler started.");

        }

        private static async Task<String> GetAllNotifications(IConfiguration config)
        {
            string notificationList = "Empty";
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config["NotificationConnection"]);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync("api/Notifications/GetAllNotifications");
                if (response.IsSuccessStatusCode)
                {
                    notificationList = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(notificationList);
                }
            }
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
