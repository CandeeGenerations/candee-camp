using Quartz;
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
            //using (StreamWriter streamWriter = new StreamWriter(@"D:\IDGLog.txt", true))
            //{
            //    streamWriter.WriteLine(DateTime.Now.ToString());
            //}
            await Console.Out.WriteLineAsync("HelloJob is executing.");
        }

        //Task IJob.Execute(IJobExecutionContext context)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
