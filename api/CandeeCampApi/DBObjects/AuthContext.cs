//using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
//using System.Data.Entity;
using System.Linq;
using System.Web;
using CandeeCampApi.Models;

namespace CandeeCampApi.DBObjects
{
    [System.Data.Entity.DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class AuthContext : IdentityDbContext<IdentityUser>
    {
        public AuthContext()
            : base("server=162.250.226.131;User Id=candeecamp;Persist Security Info=True;database=darklordpaladin_candeecampier;password=pleaseclap")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);



            // Shorten key length for Identity

            //modelBuilder.Entity<HistoryRow>().Property(p => p.Email).HasMaxLength(1);
            modelBuilder.Entity<IdentityUser>().Property(p => p.UserName).HasMaxLength(30);
            //modelBuilder.Entity<IdentityUser>().Property(p => p.Id).HasColumnType("int");

            modelBuilder.Entity<IdentityRole>().Property(p => p.Name).HasMaxLength(1);
        
            modelBuilder.Entity<IdentityUserLogin>().Property(p => p.LoginProvider).HasMaxLength(1);
            modelBuilder.Entity<IdentityUserLogin>().Property(p => p.ProviderKey).HasMaxLength(1);

            modelBuilder.Entity<IdentityUserRole>().Property(p => p.UserId).HasMaxLength(1);
            modelBuilder.Entity<IdentityUserRole>().Property(p => p.RoleId).HasMaxLength(1);
            //modelBuilder.Entity<Event>().Property(p => p.eventName).HasMaxLength(50);
        }

        public System.Data.Entity.DbSet<Person> People { get; set; }
        public System.Data.Entity.DbSet<Event> Events { get; set; }

    }
}