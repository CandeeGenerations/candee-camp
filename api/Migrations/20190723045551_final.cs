using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_Id",
                table: "Groups");

            migrationBuilder.AddColumn<int>(
                name: "CamperId",
                table: "SnackShopPurchases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CounselorId",
                table: "SnackShopPurchases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SnackShopItemId",
                table: "SnackShopPurchases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CamperId",
                table: "RedeemedCoupons",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CouponId",
                table: "RedeemedCoupons",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CabinId",
                table: "Counselors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Counselors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CabinId",
                table: "Campers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CounselorId",
                table: "Campers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Campers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LoginUser",
                table: "Campers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 7, 23, 4, 55, 51, 460, DateTimeKind.Unspecified).AddTicks(9303), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 23, 0, 55, 51, 460, DateTimeKind.Unspecified).AddTicks(8546), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 7, 23, 0, 55, 51, 460, DateTimeKind.Unspecified).AddTicks(8558), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 23, 0, 55, 51, 457, DateTimeKind.Unspecified).AddTicks(7755), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 7, 23, 0, 55, 51, 459, DateTimeKind.Unspecified).AddTicks(6648), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopPurchases_CamperId",
                table: "SnackShopPurchases",
                column: "CamperId");

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopPurchases_CounselorId",
                table: "SnackShopPurchases",
                column: "CounselorId");

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopPurchases_SnackShopItemId",
                table: "SnackShopPurchases",
                column: "SnackShopItemId");

            migrationBuilder.CreateIndex(
                name: "IX_RedeemedCoupons_CamperId",
                table: "RedeemedCoupons",
                column: "CamperId");

            migrationBuilder.CreateIndex(
                name: "IX_RedeemedCoupons_CouponId",
                table: "RedeemedCoupons",
                column: "CouponId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_LoginUser",
                table: "Groups",
                column: "LoginUser");

            migrationBuilder.CreateIndex(
                name: "IX_Counselors_CabinId",
                table: "Counselors",
                column: "CabinId");

            migrationBuilder.CreateIndex(
                name: "IX_Counselors_UserId",
                table: "Counselors",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Campers_CabinId",
                table: "Campers",
                column: "CabinId");

            migrationBuilder.CreateIndex(
                name: "IX_Campers_CounselorId",
                table: "Campers",
                column: "CounselorId");

            migrationBuilder.CreateIndex(
                name: "IX_Campers_GroupId",
                table: "Campers",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Campers_LoginUser",
                table: "Campers",
                column: "LoginUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Cabins_CabinId",
                table: "Campers",
                column: "CabinId",
                principalTable: "Cabins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Counselors_CounselorId",
                table: "Campers",
                column: "CounselorId",
                principalTable: "Counselors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Groups_GroupId",
                table: "Campers",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Users_LoginUser",
                table: "Campers",
                column: "LoginUser",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Counselors_Cabins_CabinId",
                table: "Counselors",
                column: "CabinId",
                principalTable: "Cabins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Counselors_Users_UserId",
                table: "Counselors",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_LoginUser",
                table: "Groups",
                column: "LoginUser",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RedeemedCoupons_Campers_CamperId",
                table: "RedeemedCoupons",
                column: "CamperId",
                principalTable: "Campers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RedeemedCoupons_Coupons_CouponId",
                table: "RedeemedCoupons",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_SnackShopItems_SnackShopItemId",
                table: "SnackShopPurchases",
                column: "SnackShopItemId",
                principalTable: "SnackShopItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Cabins_CabinId",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Counselors_CounselorId",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Groups_GroupId",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Users_LoginUser",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Counselors_Cabins_CabinId",
                table: "Counselors");

            migrationBuilder.DropForeignKey(
                name: "FK_Counselors_Users_UserId",
                table: "Counselors");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_LoginUser",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_RedeemedCoupons_Campers_CamperId",
                table: "RedeemedCoupons");

            migrationBuilder.DropForeignKey(
                name: "FK_RedeemedCoupons_Coupons_CouponId",
                table: "RedeemedCoupons");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Campers_CamperId",
                table: "SnackShopPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Counselors_CounselorId",
                table: "SnackShopPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_SnackShopItems_SnackShopItemId",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopPurchases_CamperId",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopPurchases_CounselorId",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopPurchases_SnackShopItemId",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_RedeemedCoupons_CamperId",
                table: "RedeemedCoupons");

            migrationBuilder.DropIndex(
                name: "IX_RedeemedCoupons_CouponId",
                table: "RedeemedCoupons");

            migrationBuilder.DropIndex(
                name: "IX_Groups_LoginUser",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Counselors_CabinId",
                table: "Counselors");

            migrationBuilder.DropIndex(
                name: "IX_Counselors_UserId",
                table: "Counselors");

            migrationBuilder.DropIndex(
                name: "IX_Campers_CabinId",
                table: "Campers");

            migrationBuilder.DropIndex(
                name: "IX_Campers_CounselorId",
                table: "Campers");

            migrationBuilder.DropIndex(
                name: "IX_Campers_GroupId",
                table: "Campers");

            migrationBuilder.DropIndex(
                name: "IX_Campers_LoginUser",
                table: "Campers");

            migrationBuilder.DropColumn(
                name: "CamperId",
                table: "SnackShopPurchases");

            migrationBuilder.DropColumn(
                name: "CounselorId",
                table: "SnackShopPurchases");

            migrationBuilder.DropColumn(
                name: "SnackShopItemId",
                table: "SnackShopPurchases");

            migrationBuilder.DropColumn(
                name: "CamperId",
                table: "RedeemedCoupons");

            migrationBuilder.DropColumn(
                name: "CouponId",
                table: "RedeemedCoupons");

            migrationBuilder.DropColumn(
                name: "CabinId",
                table: "Counselors");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Counselors");

            migrationBuilder.DropColumn(
                name: "CabinId",
                table: "Campers");

            migrationBuilder.DropColumn(
                name: "CounselorId",
                table: "Campers");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Campers");

            migrationBuilder.DropColumn(
                name: "LoginUser",
                table: "Campers");

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 7, 21, 1, 18, 3, 839, DateTimeKind.Unspecified).AddTicks(6824), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 20, 21, 18, 3, 839, DateTimeKind.Unspecified).AddTicks(6139), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 7, 20, 21, 18, 3, 839, DateTimeKind.Unspecified).AddTicks(6150), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 20, 21, 18, 3, 836, DateTimeKind.Unspecified).AddTicks(3589), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 7, 20, 21, 18, 3, 838, DateTimeKind.Unspecified).AddTicks(3843), new TimeSpan(0, -4, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_Id",
                table: "Groups",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
