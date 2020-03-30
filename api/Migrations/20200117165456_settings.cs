using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class settings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Key = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    Version = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Key);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "UELRCv0gUwlAoVdjYvC1taYgiBlSIU");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 10, 52, 57, 767, DateTimeKind.Unspecified).AddTicks(4100), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 10, 52, 57, 790, DateTimeKind.Unspecified).AddTicks(3100), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
