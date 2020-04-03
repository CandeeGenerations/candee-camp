using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class portals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Settings",
                table: "Settings");

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "SnackShopPurchases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "SnackShopItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Settings",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(95) CHARACTER SET utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Settings",
                nullable: false,
                defaultValue: 0)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Registrations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Payments_Donations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Groups",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Events",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "CustomFields",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Coupons",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Counselors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Campers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "Cabins",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PortalId",
                table: "AuthClients",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Settings",
                table: "Settings",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Portals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Portals", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_PortalId",
                table: "Users",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopPurchases_PortalId",
                table: "SnackShopPurchases",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_SnackShopItems_PortalId",
                table: "SnackShopItems",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Settings_PortalId",
                table: "Settings",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Registrations_PortalId",
                table: "Registrations",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_Donations_PortalId",
                table: "Payments_Donations",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_PortalId",
                table: "Groups",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_PortalId",
                table: "Events",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFields_PortalId",
                table: "CustomFields",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_PortalId",
                table: "Coupons",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Counselors_PortalId",
                table: "Counselors",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Campers_PortalId",
                table: "Campers",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_Cabins_PortalId",
                table: "Cabins",
                column: "PortalId");

            migrationBuilder.CreateIndex(
                name: "IX_AuthClients_PortalId",
                table: "AuthClients",
                column: "PortalId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuthClients_Portals_PortalId",
                table: "AuthClients",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cabins_Portals_PortalId",
                table: "Cabins",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Portals_PortalId",
                table: "Campers",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Counselors_Portals_PortalId",
                table: "Counselors",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Portals_PortalId",
                table: "Coupons",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFields_Portals_PortalId",
                table: "CustomFields",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Portals_PortalId",
                table: "Events",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Portals_PortalId",
                table: "Groups",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Donations_Portals_PortalId",
                table: "Payments_Donations",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Registrations_Portals_PortalId",
                table: "Registrations",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Portals_PortalId",
                table: "Settings",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopItems_Portals_PortalId",
                table: "SnackShopItems",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SnackShopPurchases_Portals_PortalId",
                table: "SnackShopPurchases",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Portals_PortalId",
                table: "Users",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuthClients_Portals_PortalId",
                table: "AuthClients");

            migrationBuilder.DropForeignKey(
                name: "FK_Cabins_Portals_PortalId",
                table: "Cabins");

            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Portals_PortalId",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Counselors_Portals_PortalId",
                table: "Counselors");

            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Portals_PortalId",
                table: "Coupons");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomFields_Portals_PortalId",
                table: "CustomFields");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Portals_PortalId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Portals_PortalId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Portals_PortalId",
                table: "Payments_Donations");

            migrationBuilder.DropForeignKey(
                name: "FK_Registrations_Portals_PortalId",
                table: "Registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Portals_PortalId",
                table: "Settings");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopItems_Portals_PortalId",
                table: "SnackShopItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SnackShopPurchases_Portals_PortalId",
                table: "SnackShopPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Portals_PortalId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Portals");

            migrationBuilder.DropIndex(
                name: "IX_Users_PortalId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopPurchases_PortalId",
                table: "SnackShopPurchases");

            migrationBuilder.DropIndex(
                name: "IX_SnackShopItems_PortalId",
                table: "SnackShopItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Settings",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_PortalId",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Registrations_PortalId",
                table: "Registrations");

            migrationBuilder.DropIndex(
                name: "IX_Payments_Donations_PortalId",
                table: "Payments_Donations");

            migrationBuilder.DropIndex(
                name: "IX_Groups_PortalId",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Events_PortalId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_CustomFields_PortalId",
                table: "CustomFields");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_PortalId",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Counselors_PortalId",
                table: "Counselors");

            migrationBuilder.DropIndex(
                name: "IX_Campers_PortalId",
                table: "Campers");

            migrationBuilder.DropIndex(
                name: "IX_Cabins_PortalId",
                table: "Cabins");

            migrationBuilder.DropIndex(
                name: "IX_AuthClients_PortalId",
                table: "AuthClients");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "SnackShopPurchases");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "SnackShopItems");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Registrations");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Payments_Donations");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "CustomFields");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Counselors");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Campers");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "Cabins");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "AuthClients");

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Settings",
                type: "varchar(95) CHARACTER SET utf8mb4",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Settings",
                table: "Settings",
                column: "Key");
        }
    }
}
