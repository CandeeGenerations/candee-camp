using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class settingvalues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "xROeQt0riBsMqIOs63sNjpqDJnlIER");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 12, 21, 53, 751, DateTimeKind.Unspecified).AddTicks(9050), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 12, 21, 53, 765, DateTimeKind.Unspecified).AddTicks(1080), new TimeSpan(0, -5, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Key",
                keyValue: "Name");

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Key",
                keyValue: "PayPalClientId");

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Key",
                keyValue: "PayPalClientSecret");

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "OnwXfhG0gmohsap3LtvMhh4kNIy23e");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 11, 54, 56, 34, DateTimeKind.Unspecified).AddTicks(7740), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 11, 54, 56, 49, DateTimeKind.Unspecified).AddTicks(5340), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
