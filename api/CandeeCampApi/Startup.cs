using System;
using System.Configuration;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using WebApiTokenAuth.App_Start;
using WebApiTokenAuth;
using CandeeCampApi.App_Start;
using Microsoft.Owin.Cors;
using CandeeCampApi;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using CandeeCampApi.Providers;
using Microsoft.EntityFrameworkCore;

[assembly: OwinStartup(typeof(CandeeCampApi.Startup))]
namespace CandeeCampApi
{
    /// <summary>
    /// Represents the entry point into an application.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Specifies how the ASP.NET application will respond to individual HTTP request.
        /// </summary>
        /// <param name="app">Instance of <see cref="IAppBuilder"/>.</param>
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            new ApiConfig(app)
                .ConfigureCorsMiddleware(ConfigurationManager.AppSettings["cors"])
                //.ConfigureAufacMiddleware()
                .ConfigureFormatters()
                //.ConfigureRoutes()
                //.ConfigureExceptionHandling()
                //.ConfigureSwagger()
                //.UseWebApi()
                ;

            HttpConfiguration config = new HttpConfiguration();
            
            ApiConfig.Register(config);

            ConfigureOAuth(app);
            app.UseWebApi(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            SwaggerConfig.Register(config);


           
        }

        //public void ConfigureServices(IServiceCollection services)
        //{
        //    var sqlConnectionString = "server=162.250.226.131;User Id=candeecamp;Persist Security Info=True;database=darklordpaladin_candeecamp;password=pleaseclap";

        //    services.AddDbContext<DomainModelMySqlContext>(options =>
        //        options.UseMySQL(
        //            sqlConnectionString,
        //            b => b.MigrationsAssembly("AspNetCoreMultipleProject")
        //        )
        //    );
        //}

        public void ConfigureOAuth(IAppBuilder app)
        {

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60),
                Provider = new CandeeCampApi.App_Start.SimpleAuthorizationServiceProvider()
            };

            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }

       
    }
}