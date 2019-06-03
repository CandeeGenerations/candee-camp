using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class SeedUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("ad6b592a-3f62-4327-905e-7c3a7ecd1369"));

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("a30aed4e-0e49-4cc5-8513-8dc70c62f223"), "Event 1" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateCreated", "EmailAddress", "FirstName", "LastLoggedInDate", "LastName", "PasswordHash", "RefreshToken", "Salt" },
                values: new object[] { new Guid("78910b9f-c713-4cb9-a5b7-548ffedde563"), new DateTimeOffset(new DateTime(2019, 6, 3, 10, 10, 26, 110, DateTimeKind.Unspecified).AddTicks(2360), new TimeSpan(0, -4, 0, 0, 0)), "tyler@cgen.com", "Tyler", null, "Candee", "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==", null, "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("a30aed4e-0e49-4cc5-8513-8dc70c62f223"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("78910b9f-c713-4cb9-a5b7-548ffedde563"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateCreated", "EmailAddress", "FirstName", "LastLoggedInDate", "LastName", "PasswordHash", "RefreshToken", "Salt" },
                values: new object[] { new Guid("ad6b592a-3f62-4327-905e-7c3a7ecd1369"), new DateTimeOffset(new DateTime(2019, 6, 3, 9, 57, 53, 351, DateTimeKind.Unspecified).AddTicks(2980), new TimeSpan(0, -4, 0, 0, 0)), "tyler@cgen.com", "Tyler", null, "Candee", "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==", null, "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy" });
        }
    }
}
