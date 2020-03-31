using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class addedcreatedbytocounselor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Counselors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 11, 43, 6, 440, DateTimeKind.Unspecified).AddTicks(9070), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 11, 43, 6, 440, DateTimeKind.Unspecified).AddTicks(9100), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 5, 16, 43, 6, 440, DateTimeKind.Unspecified).AddTicks(1050), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 11, 43, 6, 439, DateTimeKind.Unspecified).AddTicks(9190), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 11, 43, 6, 439, DateTimeKind.Unspecified).AddTicks(9200), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 11, 43, 6, 424, DateTimeKind.Unspecified).AddTicks(6980), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 11, 43, 6, 437, DateTimeKind.Unspecified).AddTicks(6700), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Counselors_CreatedBy",
                table: "Counselors",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Counselors_Users_CreatedBy",
                table: "Counselors",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Counselors_Users_CreatedBy",
                table: "Counselors");

            migrationBuilder.DropIndex(
                name: "IX_Counselors_CreatedBy",
                table: "Counselors");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Counselors");

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 11, 25, 14, 15, 15, 243, DateTimeKind.Unspecified).AddTicks(3260), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 11, 25, 14, 15, 15, 243, DateTimeKind.Unspecified).AddTicks(3300), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 11, 25, 19, 15, 15, 241, DateTimeKind.Unspecified).AddTicks(8780), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 11, 25, 14, 15, 15, 241, DateTimeKind.Unspecified).AddTicks(5310), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 11, 25, 14, 15, 15, 241, DateTimeKind.Unspecified).AddTicks(5330), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 11, 25, 14, 15, 15, 202, DateTimeKind.Unspecified).AddTicks(3070), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 11, 25, 14, 15, 15, 237, DateTimeKind.Unspecified).AddTicks(7030), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
