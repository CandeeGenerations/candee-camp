using System;
using System.Text;
using CandeeCamp.API.Context;
using CandeeCamp.API.ExceptionHandling;
using CandeeCamp.API.Repositories;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace CandeeCamp.API
{
    public class Startup
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfiguration _config;
        private readonly ILoggerFactory _loggerFactory;
        
        public Startup(IHostingEnvironment env, IConfiguration config, 
            ILoggerFactory loggerFactory)
        {
            _env = env;
            _config = config;
            _loggerFactory = loggerFactory;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            ILogger<Startup> logger = _loggerFactory.CreateLogger<Startup>();

            logger.LogInformation(_env.IsDevelopment()
                ? "Development environment"
                : $"Environment: {_env.EnvironmentName}");

            RegisterRepositories(services);
            
            services.AddCors();
            services.AddDbContext<CampContext>(options =>
                options.UseMySql(_config.GetConnectionString("DefaultConnection"),
                    mysqlOptions => { mysqlOptions.ServerVersion(new Version(5, 1, 73), ServerType.MySql); }
                ));

            services.AddMvc()
                .AddJsonOptions(options =>
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver())
                .AddMvcOptions(options => options.Filters.Add(new GlobalExceptionFilter(_loggerFactory)))
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            services.AddApiVersioning(options =>
            {
                options.ReportApiVersions = true;
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
            });
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(
                    options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = _config["Jwt:Issuer"],
                            ValidAudience = _config["Jwt:Audience"],
                            IssuerSigningKey =
                                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]))
                        };
                    });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            
            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowCredentials();
            });

            loggerFactory.AddConsole(_config.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<ICamperRepository, CamperRepository>();
        }
    }
}