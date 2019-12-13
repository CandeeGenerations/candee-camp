using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class snackshopitemsupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Campers_CamperId",
                table: "SnackShopPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Counselors_CounselorId",
                table: "SnackShopPurchases");

            migrationBuilder.AlterColumn<int>(
                name: "CounselorId",
                table: "SnackShopPurchases",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CamperId",
                table: "SnackShopPurchases",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "SnackShopPurchases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "SnackShopItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "SnackShopItems",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "SnackShopItems",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 13, 9, 11, 8, 113, DateTimeKind.Unspecified).AddTicks(3930), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 13, 9, 11, 8, 113, DateTimeKind.Unspecified).AddTicks(3960), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 13, 14, 11, 8, 112, DateTimeKind.Unspecified).AddTicks(8320), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 13, 9, 11, 8, 112, DateTimeKind.Unspecified).AddTicks(6940), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 13, 9, 11, 8, 112, DateTimeKind.Unspecified).AddTicks(6950), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 13, 9, 11, 8, 95, DateTimeKind.Unspecified).AddTicks(1780), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 13, 9, 11, 8, 111, DateTimeKind.Unspecified).AddTicks(2460), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopPurchases_CreatedBy",
                table: "SnackShopPurchases",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopItems_CreatedBy",
                table: "SnackShopItems",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopItems_Users_CreatedBy",
                table: "SnackShopItems",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_Campers_CamperId",
                table: "SnackShopPurchases",
                column: "CamperId",
                principalTable: "Campers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_Counselors_CounselorId",
                table: "SnackShopPurchases",
                column: "CounselorId",
                principalTable: "Counselors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_Users_CreatedBy",
                table: "SnackShopPurchases",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopItems_Users_CreatedBy",
                table: "SnackShopItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Campers_CamperId",
                table: "SnackShopPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Counselors_CounselorId",
                table: "SnackShopPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Users_CreatedBy",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopPurchases_CreatedBy",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopItems_CreatedBy",
                table: "SnackShopItems");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "SnackShopPurchases");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "SnackShopItems");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "SnackShopItems");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "SnackShopItems");

            migrationBuilder.AlterColumn<int>(
                name: "CounselorId",
                table: "SnackShopPurchases",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CamperId",
                table: "SnackShopPurchases",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_Campers_CamperId",
                table: "SnackShopPurchases",
                column: "CamperId",
                principalTable: "Campers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_Counselors_CounselorId",
                table: "SnackShopPurchases",
                column: "CounselorId",
                principalTable: "Counselors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
