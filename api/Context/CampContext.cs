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
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Payment_Donation> Payments_Donations { get; set; }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<Camper> Campers { get; set; }
        public DbSet<Counselor> Counselors { get; set; }
        public DbSet<Cabin> Cabins { get; set; }
        public DbSet<RedeemedCoupon> RedeemedCoupons { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<SnackShopPurchase> SnackShopPurchases { get; set; }
        public DbSet<SnackShopItem> SnackShopItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = -1,
                FirstName = "Tyler",
                LastName = "Candee",
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                EmailAddress = "tyler@cgen.com",
                Salt = "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy",
                PasswordHash =
                    "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==",
                IsActive = true,
                IsDeleted = false,
            });

            modelBuilder.Entity<Event>().HasOne(u => u.User).WithMany().HasForeignKey(e => e.CreatedBy);

            modelBuilder.Entity<Payment_Donation>().HasOne(u => u.User).WithMany().HasForeignKey(pd => pd.UserId);

            modelBuilder.Entity<Registration>().HasOne(u => u.User).WithMany().HasForeignKey(r => r.EventId);
            modelBuilder.Entity<Registration>().HasOne(u => u.User).WithMany().HasForeignKey(r => r.CamperId);

            modelBuilder.Entity<Group>().HasOne(u => u.User).WithMany().HasForeignKey(g => g.LoginUser);
            modelBuilder.Entity<Group>().HasOne(u => u.CreatedByUser).WithMany().HasForeignKey(g => g.CreatedBy);

            modelBuilder.Entity<RedeemedCoupon>().HasOne(co => co.Coupon).WithMany().HasForeignKey(rc => rc.CouponId);
            modelBuilder.Entity<RedeemedCoupon>().HasOne(ca => ca.Camper).WithMany().HasForeignKey(rc => rc.CamperId);

            modelBuilder.Entity<Camper>().HasOne(u => u.User).WithMany().HasForeignKey(ca => ca.LoginUser);
            modelBuilder.Entity<Camper>().HasOne(u => u.CreatedByUser).WithMany().HasForeignKey(ca => ca.CreatedBy);
            modelBuilder.Entity<Camper>().HasOne(g => g.Group).WithMany().HasForeignKey(ca => ca.GroupId);
            modelBuilder.Entity<Camper>().HasOne(cb => cb.Cabin).WithMany().HasForeignKey(ca => ca.CabinId);
            modelBuilder.Entity<Camper>().HasOne(co => co.Counselor).WithMany().HasForeignKey(ca => ca.CounselorId);

            modelBuilder.Entity<Counselor>().HasOne(u => u.User).WithMany().HasForeignKey(co => co.UserId);
            modelBuilder.Entity<Counselor>().HasOne(u => u.CreatedByUser).WithMany().HasForeignKey(co => co.CreatedBy);
            modelBuilder.Entity<Counselor>().HasOne(cb => cb.Cabin).WithMany().HasForeignKey(co => co.CabinId);

            modelBuilder.Entity<Cabin>().HasOne(u => u.CreatedByUser).WithMany().HasForeignKey(cb => cb.CreatedBy);
            
            modelBuilder.Entity<Coupon>().HasOne(u => u.CreatedByUser).WithMany().HasForeignKey(cp => cp.CreatedBy);

            modelBuilder.Entity<SnackShopPurchase>().HasOne(s => s.SnackShopItem).WithMany()
                .HasForeignKey(s => s.SnackShopItemId);
            modelBuilder.Entity<SnackShopPurchase>().HasOne(cb => cb.Camper).WithMany()
                .HasForeignKey(co => co.CamperId);
            modelBuilder.Entity<SnackShopPurchase>().HasOne(cb => cb.Counselor).WithMany()
                .HasForeignKey(co => co.CounselorId);


            base.OnModelCreating(modelBuilder);
        }
    }
}