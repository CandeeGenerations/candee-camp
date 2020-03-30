using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class customfieldsupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "CustomFields",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "CustomFields",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "CustomFields",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_CustomFields_CreatedBy",
                table: "CustomFields",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFields_Users_CreatedBy",
                table: "CustomFields",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomFields_Users_CreatedBy",
                table: "CustomFields");

            migrationBuilder.DropIndex(
                name: "IX_CustomFields_CreatedBy",
                table: "CustomFields");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CustomFields");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "CustomFields");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "CustomFields");
        }
    }
}
