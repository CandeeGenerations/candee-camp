using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class couponupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "ExpirationDate",
                table: "Coupons",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetime");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Coupons",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Coupons",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "Coupons",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 9, 14, 33, 25, 565, DateTimeKind.Unspecified).AddTicks(6160), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 9, 14, 33, 25, 565, DateTimeKind.Unspecified).AddTicks(6200), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 9, 19, 33, 25, 564, DateTimeKind.Unspecified).AddTicks(8900), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 9, 14, 33, 25, 564, DateTimeKind.Unspecified).AddTicks(7180), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 9, 14, 33, 25, 564, DateTimeKind.Unspecified).AddTicks(7200), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 9, 14, 33, 25, 549, DateTimeKind.Unspecified).AddTicks(3300), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 9, 14, 33, 25, 562, DateTimeKind.Unspecified).AddTicks(9070), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_CreatedBy",
                table: "Coupons",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Users_CreatedBy",
                table: "Coupons",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Users_CreatedBy",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_CreatedBy",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Coupons");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "ExpirationDate",
                table: "Coupons",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 34, DateTimeKind.Unspecified).AddTicks(9670), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 34, DateTimeKind.Unspecified).AddTicks(9730), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 8, 2, 14, 18, 34, DateTimeKind.Unspecified).AddTicks(1420), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 33, DateTimeKind.Unspecified).AddTicks(9570), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 33, DateTimeKind.Unspecified).AddTicks(9600), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 17, DateTimeKind.Unspecified).AddTicks(9190), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 7, 21, 14, 18, 32, DateTimeKind.Unspecified).AddTicks(1890), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
