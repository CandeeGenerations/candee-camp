﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Reclaimed.API.Context;

namespace Reclaimed.API.Migrations
{
    [DbContext(typeof(CampContext))]
    [Migration("20191205170734_counselor-add-date-updated")]
    partial class counseloradddateupdated
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Cabin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("name");

                    b.HasKey("Id");

                    b.ToTable("Cabins");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Camper", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Allergies");

                    b.Property<DateTimeOffset?>("BirthDate");

                    b.Property<int?>("CabinId");

                    b.Property<int?>("CounselorId");

                    b.Property<int?>("CreatedBy");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<string>("FirstName");

                    b.Property<int?>("GroupId");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("LastName");

                    b.Property<int?>("LoginUser");

                    b.Property<string>("Medicine");

                    b.Property<string>("ParentFirstName");

                    b.Property<string>("ParentLastName");

                    b.Property<DateTimeOffset>("UpdatedDate");

                    b.HasKey("Id");

                    b.HasIndex("CabinId");

                    b.HasIndex("CounselorId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("GroupId");

                    b.HasIndex("LoginUser");

                    b.ToTable("Campers");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            Allergies = "Strawberries",
                            BirthDate = new DateTimeOffset(new DateTime(2010, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -4, 0, 0, 0)),
                            CreatedBy = -1,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 832, DateTimeKind.Unspecified).AddTicks(7030), new TimeSpan(0, -5, 0, 0, 0)),
                            FirstName = "Jocelyn",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "Lacombe",
                            Medicine = "Ibuprofen",
                            ParentFirstName = "John",
                            ParentLastName = "Lacombe",
                            UpdatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 832, DateTimeKind.Unspecified).AddTicks(7060), new TimeSpan(0, -5, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Counselor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CabinId");

                    b.Property<int>("CreatedBy");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("LastName");

                    b.Property<decimal>("StartingBalance");

                    b.Property<DateTimeOffset>("UpdatedDate");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CabinId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UserId");

                    b.ToTable("Counselors");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Coupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<DateTimeOffset>("ExpirationDate");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.HasKey("Id");

                    b.ToTable("Coupons");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal?>("Cost");

                    b.Property<int?>("CreatedBy");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<DateTimeOffset>("EndDate");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTimeOffset>("StartDate");

                    b.Property<DateTimeOffset?>("UpdatedDate");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            CreatedBy = -1,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 17, 7, 33, 831, DateTimeKind.Unspecified).AddTicks(8950), new TimeSpan(0, 0, 0, 0, 0)),
                            EndDate = new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)),
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Event 1",
                            StartDate = new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CreatedBy");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<int>("LoginUser");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTimeOffset>("UpdatedDate");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("LoginUser");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Payment_Donation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal?>("Amount");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Processor");

                    b.Property<string>("Type")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Payments_Donations");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.RedeemedCoupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CamperId");

                    b.Property<int>("CouponId");

                    b.Property<DateTimeOffset>("RedeemedDate");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.HasIndex("CouponId");

                    b.ToTable("RedeemedCoupons");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Registration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CamperId");

                    b.Property<DateTimeOffset>("CheckInDate");

                    b.Property<DateTimeOffset>("CheckOutDate");

                    b.Property<int>("EventId");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTimeOffset>("RegistrationDate");

                    b.Property<decimal>("StartingBalance");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AmountAvailable");

                    b.Property<string>("Barcode");

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("SnackShopItems");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopPurchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CamperId");

                    b.Property<int>("CounselorId");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTimeOffset>("PurchasedDate");

                    b.Property<decimal?>("PurchasedPrice");

                    b.Property<int>("SnackShopItemId");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.HasIndex("CounselorId");

                    b.HasIndex("SnackShopItemId");

                    b.ToTable("SnackShopPurchases");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<string>("EmailAddress")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTimeOffset?>("LastLoggedInDate");

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<DateTimeOffset?>("ResetPasswordExpirationDate");

                    b.Property<string>("ResetPasswordToken");

                    b.Property<string>("Salt")
                        .IsRequired();

                    b.Property<DateTimeOffset>("UpdatedDate");

                    b.Property<string>("UserRole");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 814, DateTimeKind.Unspecified).AddTicks(9150), new TimeSpan(0, -5, 0, 0, 0)),
                            EmailAddress = "tyler@cgen.com",
                            FirstName = "Tyler",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "Candee",
                            PasswordHash = "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==",
                            Salt = "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy",
                            UpdatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 829, DateTimeKind.Unspecified).AddTicks(2670), new TimeSpan(0, -5, 0, 0, 0))
                        },
                        new
                        {
                            Id = -2,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 831, DateTimeKind.Unspecified).AddTicks(7090), new TimeSpan(0, -5, 0, 0, 0)),
                            EmailAddress = "theblackswimmers@gmail.com",
                            FirstName = "joe",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "plumber",
                            PasswordHash = "WkZsAKSKmh9C/WoaCfI4xiSOl7nRw8p5i4T90h54+EkMmtfLwcjCRi9kFkIZRMv/RFaGrTP3FzxcWapHnuNdzw==",
                            Salt = "nqJBdDHXBCGrPiZHRmUBgYMVdgsSCZxaWyjOZnCxAAMrPghUzARqcAcEynPwQNkD",
                            UpdatedDate = new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 831, DateTimeKind.Unspecified).AddTicks(7110), new TimeSpan(0, -5, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Camper", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Cabin", "Cabin")
                        .WithMany()
                        .HasForeignKey("CabinId");

                    b.HasOne("CandeeCamp.API.DomainObjects.Counselor", "Counselor")
                        .WithMany()
                        .HasForeignKey("CounselorId");

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy");

                    b.HasOne("CandeeCamp.API.DomainObjects.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("LoginUser");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Counselor", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Cabin", "Cabin")
                        .WithMany()
                        .HasForeignKey("CabinId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Event", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("CreatedBy");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Group", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("LoginUser")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Payment_Donation", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.RedeemedCoupon", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.Coupon", "Coupon")
                        .WithMany()
                        .HasForeignKey("CouponId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Registration", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopPurchase", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.Counselor", "Counselor")
                        .WithMany()
                        .HasForeignKey("CounselorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CandeeCamp.API.DomainObjects.SnackShopItem", "SnackShopItem")
                        .WithMany()
                        .HasForeignKey("SnackShopItemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}