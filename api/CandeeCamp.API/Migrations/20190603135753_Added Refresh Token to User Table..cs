using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class AddedRefreshTokentoUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("71acd5ee-2325-4ea3-9c63-ee564f848e4e"));

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "Users",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateCreated", "EmailAddress", "FirstName", "LastLoggedInDate", "LastName", "PasswordHash", "RefreshToken", "Salt" },
                values: new object[] { new Guid("ad6b592a-3f62-4327-905e-7c3a7ecd1369"), new DateTimeOffset(new DateTime(2019, 6, 3, 9, 57, 53, 351, DateTimeKind.Unspecified).AddTicks(2980), new TimeSpan(0, -4, 0, 0, 0)), "tyler@cgen.com", "Tyler", null, "Candee", "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==", null, "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("ad6b592a-3f62-4327-905e-7c3a7ecd1369"));

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateCreated", "EmailAddress", "FirstName", "LastLoggedInDate", "LastName", "PasswordHash", "Salt" },
                values: new object[] { new Guid("71acd5ee-2325-4ea3-9c63-ee564f848e4e"), new DateTimeOffset(new DateTime(2019, 5, 31, 13, 54, 23, 572, DateTimeKind.Unspecified).AddTicks(1520), new TimeSpan(0, -4, 0, 0, 0)), "tyler@cgen.com", "Tyler", null, "Candee", "wBgGr1+o8FslJLuthZD3kW8s3vJh7u3A/MOWFhuGHIjIh2sMdabi5CsiabpubEGW6k3JBPb5+Wme1YePXbrZZg==", "VkkXfciryMpzvrSaHzyfDQJYBGhFbDUuHqgHhXhsrOASYyqPGsLGyKSivTeKPdcy" });
        }
    }
}
