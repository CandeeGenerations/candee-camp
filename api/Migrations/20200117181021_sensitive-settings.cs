using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class sensitivesettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Sensitive",
                table: "Settings",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "8bqsu5AMQwbOYSlnZHkw2tCdyhPTyW");

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Key",
                keyValue: "PayPalClientId",
                column: "Sensitive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Key",
                keyValue: "PayPalClientSecret",
                column: "Sensitive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 13, 10, 21, 80, DateTimeKind.Unspecified).AddTicks(6400), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 13, 10, 21, 95, DateTimeKind.Unspecified).AddTicks(7350), new TimeSpan(0, -5, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sensitive",
                table: "Settings");

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
    }
}
