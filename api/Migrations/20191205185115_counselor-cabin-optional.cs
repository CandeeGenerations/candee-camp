using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class counselorcabinoptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Counselors_Cabins_CabinId",
                table: "Counselors");

            migrationBuilder.AlterColumn<int>(
                name: "CabinId",
                table: "Counselors",
                nullable: true,
                oldClrType: typeof(int));

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

            migrationBuilder.AddForeignKey(
                name: "FK_Counselors_Cabins_CabinId",
                table: "Counselors",
                column: "CabinId",
                principalTable: "Cabins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Counselors_Cabins_CabinId",
                table: "Counselors");

            migrationBuilder.AlterColumn<int>(
                name: "CabinId",
                table: "Counselors",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 832, DateTimeKind.Unspecified).AddTicks(7030), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 832, DateTimeKind.Unspecified).AddTicks(7060), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 5, 17, 7, 33, 831, DateTimeKind.Unspecified).AddTicks(8950), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 831, DateTimeKind.Unspecified).AddTicks(7090), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 831, DateTimeKind.Unspecified).AddTicks(7110), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 814, DateTimeKind.Unspecified).AddTicks(9150), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 12, 7, 33, 829, DateTimeKind.Unspecified).AddTicks(2670), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_Counselors_Cabins_CabinId",
                table: "Counselors",
                column: "CabinId",
                principalTable: "Cabins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
