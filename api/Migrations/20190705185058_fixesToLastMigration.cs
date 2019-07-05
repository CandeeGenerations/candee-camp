using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class fixesToLastMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Cost",
                table: "Events",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Cost", "CreatedDate", "IsActive" },
                values: new object[] { null, new DateTimeOffset(new DateTime(2019, 7, 5, 18, 50, 57, 136, DateTimeKind.Unspecified).AddTicks(7040), new TimeSpan(0, 0, 0, 0, 0)), true });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "IsActive" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 14, 50, 57, 136, DateTimeKind.Unspecified).AddTicks(5070), new TimeSpan(0, -4, 0, 0, 0)), true });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "IsActive" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 14, 50, 57, 124, DateTimeKind.Unspecified).AddTicks(340), new TimeSpan(0, -4, 0, 0, 0)), true });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Cost",
                table: "Events",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Cost", "CreatedDate", "IsActive" },
                values: new object[] { 0m, new DateTimeOffset(new DateTime(2019, 7, 5, 18, 46, 51, 824, DateTimeKind.Unspecified).AddTicks(9120), new TimeSpan(0, 0, 0, 0, 0)), false });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "IsActive" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 14, 46, 51, 824, DateTimeKind.Unspecified).AddTicks(7260), new TimeSpan(0, -4, 0, 0, 0)), false });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "IsActive" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 14, 46, 51, 812, DateTimeKind.Unspecified).AddTicks(7840), new TimeSpan(0, -4, 0, 0, 0)), false });
        }
    }
}
