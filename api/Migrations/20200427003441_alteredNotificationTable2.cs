using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class alteredNotificationTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Again",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Stuff",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Things",
                table: "Notifications");

            migrationBuilder.AddColumn<string>(
                name: "Descriptor",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Schedule",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Start",
                table: "Notifications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descriptor",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Schedule",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Start",
                table: "Notifications");

            migrationBuilder.AddColumn<string>(
                name: "Again",
                table: "Notifications",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Stuff",
                table: "Notifications",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Things",
                table: "Notifications",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
