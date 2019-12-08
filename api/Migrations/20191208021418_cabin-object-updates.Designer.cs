﻿// <auto-generated />
using System;
using CandeeCamp.API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CandeeCamp.API.Migrations
{
    [DbContext(typeof(CampContext))]
    [Migration("20191208021418_cabin-object-updates")]
    partial class cabinobjectupdates
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Cabin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.ToTable("Cabins");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Camper", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Allergies")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset?>("BirthDate")
                        .HasColumnType("datetime");

                    b.Property<int?>("CabinId")
                        .HasColumnType("int");

                    b.Property<int?>("CounselorId")
                        .HasColumnType("int");

                    b.Property<int?>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("GroupId")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("LoginUser")
                        .HasColumnType("int");

                    b.Property<string>("Medicine")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ParentFirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ParentLastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

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
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 34, DateTimeKind.Unspecified).AddTicks(9670), new TimeSpan(0, -5, 0, 0, 0)),
                            FirstName = "Jocelyn",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "Lacombe",
                            Medicine = "Ibuprofen",
                            ParentFirstName = "John",
                            ParentLastName = "Lacombe",
                            UpdatedDate = new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 34, DateTimeKind.Unspecified).AddTicks(9730), new TimeSpan(0, -5, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Counselor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CabinId")
                        .HasColumnType("int");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<decimal>("StartingBalance")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CabinId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UserId");

                    b.ToTable("Counselors");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Coupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset>("ExpirationDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("Coupons");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal?>("Cost")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset>("EndDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            CreatedBy = -1,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 8, 2, 14, 18, 34, DateTimeKind.Unspecified).AddTicks(1420), new TimeSpan(0, 0, 0, 0, 0)),
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
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("LoginUser")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("LoginUser");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Payment_Donation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Processor")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Payments_Donations");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.RedeemedCoupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CamperId")
                        .HasColumnType("int");

                    b.Property<int>("CouponId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("RedeemedDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.HasIndex("CouponId");

                    b.ToTable("RedeemedCoupons");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Registration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CamperId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CheckInDate")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset>("CheckOutDate")
                        .HasColumnType("datetime");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset>("RegistrationDate")
                        .HasColumnType("datetime");

                    b.Property<decimal>("StartingBalance")
                        .HasColumnType("decimal(65,30)");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AmountAvailable")
                        .HasColumnType("int");

                    b.Property<string>("Barcode")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("SnackShopItems");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopPurchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CamperId")
                        .HasColumnType("int");

                    b.Property<int>("CounselorId")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset>("PurchasedDate")
                        .HasColumnType("datetime");

                    b.Property<decimal?>("PurchasedPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("SnackShopItemId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.HasIndex("CounselorId");

                    b.HasIndex("SnackShopItemId");

                    b.ToTable("SnackShopPurchases");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LastLoggedInDate")
                        .HasColumnType("datetime");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset?>("ResetPasswordExpirationDate")
                        .HasColumnType("datetime");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.Property<string>("UserRole")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 17, DateTimeKind.Unspecified).AddTicks(9190), new TimeSpan(0, -5, 0, 0, 0)),
                            EmailAddress = "tyler@cgen.com",
                            FirstName = "Tyler",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "Candee",
                            PasswordHash = "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==",
                            Salt = "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy",
                            UpdatedDate = new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 32, DateTimeKind.Unspecified).AddTicks(1890), new TimeSpan(0, -5, 0, 0, 0))
                        },
                        new
                        {
                            Id = -2,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 33, DateTimeKind.Unspecified).AddTicks(9570), new TimeSpan(0, -5, 0, 0, 0)),
                            EmailAddress = "theblackswimmers@gmail.com",
                            FirstName = "joe",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "plumber",
                            PasswordHash = "WkZsAKSKmh9C/WoaCfI4xiSOl7nRw8p5i4T90h54+EkMmtfLwcjCRi9kFkIZRMv/RFaGrTP3FzxcWapHnuNdzw==",
                            Salt = "nqJBdDHXBCGrPiZHRmUBgYMVdgsSCZxaWyjOZnCxAAMrPghUzARqcAcEynPwQNkD",
                            UpdatedDate = new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 33, DateTimeKind.Unspecified).AddTicks(9600), new TimeSpan(0, -5, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Cabin", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
                        .HasForeignKey("CabinId");

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("LoginUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Payment_Donation", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.RedeemedCoupon", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.Coupon", "Coupon")
                        .WithMany()
                        .HasForeignKey("CouponId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Registration", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopPurchase", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.Counselor", "Counselor")
                        .WithMany()
                        .HasForeignKey("CounselorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.SnackShopItem", "SnackShopItem")
                        .WithMany()
                        .HasForeignKey("SnackShopItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
