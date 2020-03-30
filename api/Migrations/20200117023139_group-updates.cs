using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class groupupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_CreatedBy",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_LoginUser",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "LoginUser",
                table: "Groups",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "Groups",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "mcTxzHc9grANxJuqF0jIcj7JVTVr8d");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 16, 21, 31, 39, 285, DateTimeKind.Unspecified).AddTicks(4950), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 16, 21, 31, 39, 299, DateTimeKind.Unspecified).AddTicks(370), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_CreatedBy",
                table: "Groups",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_LoginUser",
                table: "Groups",
                column: "LoginUser",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_CreatedBy",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_LoginUser",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "LoginUser",
                table: "Groups",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "Groups",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "lp3JeUxAgho6yuV5dZbqqMw4F6lzgY");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 16, 7, 21, 0, 952, DateTimeKind.Unspecified).AddTicks(3530), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 16, 7, 21, 0, 965, DateTimeKind.Unspecified).AddTicks(6790), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_CreatedBy",
                table: "Groups",
                column: "CreatedBy",
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
        }
    }
}
