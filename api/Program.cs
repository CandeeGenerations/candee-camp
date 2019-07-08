using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace CandeeCamp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var builder = WebHost.CreateDefaultBuilder(args);

#if DEBUG
            builder.UseUrls("http://localhost:5000", "https://localhost:5001");
#endif

            return builder.UseStartup<Startup>();
        }
    }
}