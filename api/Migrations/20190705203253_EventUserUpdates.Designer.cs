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
    [Migration("20190705203253_EventUserUpdates")]
    partial class EventUserUpdates
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal?>("Cost");

                    b.Property<int>("CreatedBy");

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
                            CreatedBy = 0,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 7, 5, 20, 32, 52, 459, DateTimeKind.Unspecified).AddTicks(2050), new TimeSpan(0, 0, 0, 0, 0)),
                            EndDate = new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)),
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Event 1",
                            StartDate = new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0))
                        });
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

                    b.Property<string>("UserRole");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 7, 5, 16, 32, 52, 446, DateTimeKind.Unspecified).AddTicks(8500), new TimeSpan(0, -4, 0, 0, 0)),
                            EmailAddress = "tyler@cgen.com",
                            FirstName = "Tyler",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "Candee",
                            PasswordHash = "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==",
                            Salt = "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy"
                        },
                        new
                        {
                            Id = -2,
                            CreatedDate = new DateTimeOffset(new DateTime(2019, 7, 5, 16, 32, 52, 458, DateTimeKind.Unspecified).AddTicks(9760), new TimeSpan(0, -4, 0, 0, 0)),
                            EmailAddress = "theblackswimmers@gmail.com",
                            FirstName = "joe",
                            IsActive = true,
                            IsDeleted = false,
                            LastName = "plumber",
                            PasswordHash = "WkZsAKSKmh9C/WoaCfI4xiSOl7nRw8p5i4T90h54+EkMmtfLwcjCRi9kFkIZRMv/RFaGrTP3FzxcWapHnuNdzw==",
                            Salt = "nqJBdDHXBCGrPiZHRmUBgYMVdgsSCZxaWyjOZnCxAAMrPghUzARqcAcEynPwQNkD"
                        });
                });

            modelBuilder.Entity("CandeeCamp.API.DomainObjects.Event", b =>
                {
                    b.HasOne("CandeeCamp.API.DomainObjects.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}