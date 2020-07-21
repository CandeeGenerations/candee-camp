using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class nullablecheckinoutdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CheckOutDate",
                table: "Registrations",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetime");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CheckInDate",
                table: "Registrations",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetime");

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 13, 9, 47, 26, 395, DateTimeKind.Unspecified).AddTicks(3350), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 13, 9, 47, 26, 395, DateTimeKind.Unspecified).AddTicks(3380), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2020, 1, 13, 14, 47, 26, 394, DateTimeKind.Unspecified).AddTicks(8060), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 13, 9, 47, 26, 394, DateTimeKind.Unspecified).AddTicks(6730), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 13, 9, 47, 26, 394, DateTimeKind.Unspecified).AddTicks(6760), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 13, 9, 47, 26, 378, DateTimeKind.Unspecified).AddTicks(7270), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 13, 9, 47, 26, 393, DateTimeKind.Unspecified).AddTicks(2500), new TimeSpan(0, -5, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CheckOutDate",
                table: "Registrations",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CheckInDate",
                table: "Registrations",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 13, 9, 37, 47, 756, DateTimeKind.Unspecified).AddTicks(6920), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 13, 9, 37, 47, 756, DateTimeKind.Unspecified).AddTicks(6950), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2020, 1, 13, 14, 37, 47, 756, DateTimeKind.Unspecified).AddTicks(720), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 13, 9, 37, 47, 755, DateTimeKind.Unspecified).AddTicks(8710), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 13, 9, 37, 47, 755, DateTimeKind.Unspecified).AddTicks(8720), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 13, 9, 37, 47, 741, DateTimeKind.Unspecified).AddTicks(330), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 13, 9, 37, 47, 754, DateTimeKind.Unspecified).AddTicks(5710), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
