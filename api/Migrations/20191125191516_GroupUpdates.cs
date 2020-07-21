using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class GroupUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Groups",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "Groups",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

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

            migrationBuilder.CreateIndex(
                name: "IX_Groups_CreatedBy",
                table: "Groups",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_CreatedBy",
                table: "Groups",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_CreatedBy",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Groups_CreatedBy",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Groups");

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 782, DateTimeKind.Unspecified).AddTicks(5910), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 782, DateTimeKind.Unspecified).AddTicks(5940), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 8, 16, 12, 27, 8, 781, DateTimeKind.Unspecified).AddTicks(8320), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 781, DateTimeKind.Unspecified).AddTicks(6480), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 781, DateTimeKind.Unspecified).AddTicks(6500), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 770, DateTimeKind.Unspecified).AddTicks(6220), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 779, DateTimeKind.Unspecified).AddTicks(4860), new TimeSpan(0, -4, 0, 0, 0)) });
        }
    }
}
