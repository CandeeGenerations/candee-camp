using System;
using System.Text;
using CandeeCamp.API.Common;
using CandeeCamp.API.Context;
using CandeeCamp.API.ExceptionHandling;
using CandeeCamp.API.Repositories;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace CandeeCamp.API
{
    public class Startup
    {
        private readonly IHostEnvironment _env;
        private readonly IConfiguration _config;
        private readonly ILoggerFactory _loggerFactory;
        
        public Startup(IHostEnvironment env, IConfiguration config, 
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
                .AddMvcOptions(options =>
                {
                    options.EnableEndpointRouting = false;
                    options.Filters.Add(new GlobalExceptionFilter(_loggerFactory));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            
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

            services.AddAuthorization(options =>
            {
                options.AddPolicy(CampPolicies.Portal, policy => policy.RequireClaim("Portal"));
                options.AddPolicy(CampPolicies.Registrations, policy => policy.RequireClaim("Registrations"));
                options.AddPolicy(CampPolicies.PortalOrRegistrations,
                    policy => policy.RequireAssertion(context =>
                        context.User.HasClaim(c => (c.Type == "Portal" || c.Type == "Registrations"))));
            });
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
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
                options.WithOrigins("http://localhost:3300", _config["FrontFacingUrl"]);

                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowCredentials();
            });

            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<ICamperRepository, CamperRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<ICounselorRepository, CounselorRepository>();
            services.AddScoped<ICabinRepository, CabinRepository>();
            services.AddScoped<ICouponRepository, CouponRepository>();
            services.AddScoped<IRedeemedCouponRepository, RedeemedCouponRepository>();
            services.AddScoped<ISnackShopItemRepository, SnackShopItemRepository>();
            services.AddScoped<ISnackShopPurchaseRepository, SnackShopPurchaseRepository>();
            services.AddScoped<IRegistrationRepository, RegistrationRepository>();
            services.AddScoped<IAuthClientRepository, AuthClientRepository>();
            services.AddScoped<IPaymentDonationRepository, PaymentDonationRepository>();
            services.AddScoped<IPayPalPaymentRepository, PayPalPaymentRepository>();
        }
    }
}