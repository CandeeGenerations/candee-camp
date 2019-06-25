using System;
using System.Data.Common;
using CandeeCamp.API.DomainObjects;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Context
{
    public class CampContext : DbContext
    {
        public CampContext(DbContextOptions options) : base (options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = Guid.NewGuid(), FirstName = "Tyler", LastName = "Candee", DateCreated = DateTimeOffset.Now,
                EmailAddress = "tyler@cgen.com",
                Salt = "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy",
                PasswordHash =
                    "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg=="
            });

            modelBuilder.Entity<Event>().HasData(new Event
            {
                Id = Guid.NewGuid(), Name = "Event 1"
            });
            
            base.OnModelCreating(modelBuilder);
        }
    }
}