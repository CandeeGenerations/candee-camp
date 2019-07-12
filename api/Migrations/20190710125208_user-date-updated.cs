using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class userdateupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedBy", "CreatedDate" },
                values: new object[] { -1, new DateTimeOffset(new DateTime(2019, 7, 10, 12, 52, 8, 69, DateTimeKind.Unspecified).AddTicks(6760), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 10, 8, 52, 8, 69, DateTimeKind.Unspecified).AddTicks(4690), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 7, 10, 8, 52, 8, 69, DateTimeKind.Unspecified).AddTicks(4710), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 10, 8, 52, 8, 57, DateTimeKind.Unspecified).AddTicks(4820), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 7, 10, 8, 52, 8, 67, DateTimeKind.Unspecified).AddTicks(510), new TimeSpan(0, -4, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedBy", "CreatedDate" },
                values: new object[] { 0, new DateTimeOffset(new DateTime(2019, 7, 5, 20, 32, 52, 459, DateTimeKind.Unspecified).AddTicks(2050), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 7, 5, 16, 32, 52, 458, DateTimeKind.Unspecified).AddTicks(9760), new TimeSpan(0, -4, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 7, 5, 16, 32, 52, 446, DateTimeKind.Unspecified).AddTicks(8500), new TimeSpan(0, -4, 0, 0, 0)));
        }
    }
}
