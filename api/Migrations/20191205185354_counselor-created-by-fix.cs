using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class counselorcreatedbyfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 879, DateTimeKind.Unspecified).AddTicks(4250), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 879, DateTimeKind.Unspecified).AddTicks(4280), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 5, 18, 53, 53, 878, DateTimeKind.Unspecified).AddTicks(5330), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 878, DateTimeKind.Unspecified).AddTicks(3140), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 878, DateTimeKind.Unspecified).AddTicks(3170), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 863, DateTimeKind.Unspecified).AddTicks(1820), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 875, DateTimeKind.Unspecified).AddTicks(6730), new TimeSpan(0, -5, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 51, 15, 124, DateTimeKind.Unspecified).AddTicks(8890), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 51, 15, 124, DateTimeKind.Unspecified).AddTicks(8920), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 5, 18, 51, 15, 124, DateTimeKind.Unspecified).AddTicks(1220), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 51, 15, 123, DateTimeKind.Unspecified).AddTicks(9390), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 51, 15, 123, DateTimeKind.Unspecified).AddTicks(9410), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 51, 15, 108, DateTimeKind.Unspecified).AddTicks(770), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 51, 15, 121, DateTimeKind.Unspecified).AddTicks(7100), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
