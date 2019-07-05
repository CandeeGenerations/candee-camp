using System;
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
                Id = -1,
                FirstName = "Tyler",
                LastName = "Candee",
                CreatedDate = DateTimeOffset.Now,
                EmailAddress = "tyler@cgen.com",
                Salt = "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy",
                PasswordHash =
                    "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==",
                IsActive = true,
                IsDeleted = false,
            });
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = -2,
                FirstName = "joe",
                LastName = "plumber",
                CreatedDate = DateTimeOffset.Now,
                EmailAddress = "theblackswimmers@gmail.com",
                Salt = "nqJBdDHXBCGrPiZHRmUBgYMVdgsSCZxaWyjOZnCxAAMrPghUzARqcAcEynPwQNkD",
                PasswordHash =
                    "WkZsAKSKmh9C/WoaCfI4xiSOl7nRw8p5i4T90h54+EkMmtfLwcjCRi9kFkIZRMv/RFaGrTP3FzxcWapHnuNdzw==",
                IsActive = true,
                IsDeleted = false,
            });

            modelBuilder.Entity<Event>().HasData(new Event
            {
                Id = -1, Name = "Event 1", IsActive = true, IsDeleted = false, CreatedBy = -1
            });

            modelBuilder.Entity<Event>().HasOne(u => u.CreatedByUser).WithMany().HasForeignKey(e => e.CreatedBy);

            base.OnModelCreating(modelBuilder);
        }
    }
}