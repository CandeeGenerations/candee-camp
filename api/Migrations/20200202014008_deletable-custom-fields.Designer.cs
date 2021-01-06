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
    [Migration("20200202014008_deletable-custom-fields")]
    partial class deletablecustomfields
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.AuthClient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClientName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ClientSecret")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ClientUri")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("AuthClients");
                });

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

                    b.Property<decimal>("StartingBalance")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("CabinId");

                    b.HasIndex("CounselorId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("GroupId");

                    b.HasIndex("LoginUser");

                    b.ToTable("Campers");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.CamperCustomField", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CamperId")
                        .HasColumnType("int");

                    b.Property<int>("CustomFieldId")
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("CamperId");

                    b.HasIndex("CustomFieldId");

                    b.ToTable("CamperCustomFields");
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

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("ExpirationDate")
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

                    b.ToTable("Coupons");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.CustomField", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("FieldType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("Required")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("CustomFields");
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
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("LoginUser")
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

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.PayPal_Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("CreateDate")
                        .HasColumnType("datetime");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PayPalId")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PayerId")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("PaymentDonationId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("PaymentDonationId");

                    b.ToTable("PayPal_Payments");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Payment_Donation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Processor")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("RegistrationId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

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

                    b.Property<DateTimeOffset?>("CheckInDate")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("CheckOutDate")
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

                    b.HasIndex("EventId");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.RegistrationPayment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PaymentDonationId")
                        .HasColumnType("int");

                    b.Property<int>("RegistrationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PaymentDonationId");

                    b.HasIndex("RegistrationId");

                    b.ToTable("RegistrationPayments");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Setting", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("varchar(95) CHARACTER SET utf8mb4");

                    b.Property<bool>("Sensitive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("Key");

                    b.ToTable("Settings");
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

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.ToTable("SnackShopItems");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopPurchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CamperId")
                        .HasColumnType("int");

                    b.Property<int?>("CounselorId")
                        .HasColumnType("int");

                    b.Property<int>("CreatedBy")
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

                    b.HasIndex("CreatedBy");

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
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.UserPayment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PaymentDonationId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PaymentDonationId");

                    b.HasIndex("UserId");

                    b.ToTable("UserPayments");
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

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.CamperCustomField", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.CustomField", "CustomField")
                        .WithMany()
                        .HasForeignKey("CustomFieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Coupon", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
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
                        .HasForeignKey("CreatedBy");

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("LoginUser");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.PayPal_Payment", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Payment_Donation", "PaymentDonation")
                        .WithMany()
                        .HasForeignKey("PaymentDonationId");
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Payment_Donation", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Registration", "Registration")
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("Id")
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
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.Event", "Event")
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.RegistrationPayment", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Payment_Donation", "PaymentDonation")
                        .WithMany()
                        .HasForeignKey("PaymentDonationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.Registration", "Registration")
                        .WithMany()
                        .HasForeignKey("RegistrationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopItem", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.SnackShopPurchase", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Camper", "Camper")
                        .WithMany()
                        .HasForeignKey("CamperId");

                    b.HasOne("CandeeCamp.API.DomainObjects.Counselor", "Counselor")
                        .WithMany()
                        .HasForeignKey("CounselorId");

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.SnackShopItem", "SnackShopItem")
                        .WithMany()
                        .HasForeignKey("SnackShopItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.UserPayment", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.Payment_Donation", "PaymentDonation")
                        .WithMany()
                        .HasForeignKey("PaymentDonationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CandeeCamp.API.DomainObjects.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}