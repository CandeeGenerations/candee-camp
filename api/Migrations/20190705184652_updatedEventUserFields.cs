using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class updatedEventUserFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_CreatedBy",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "Users",
                newName: "UserRole");

            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "Events",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Events",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Events_CreatedBy",
                table: "Events",
                newName: "IX_Events_CreatedById");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "ResetPasswordExpirationDate",
                table: "Users",
                nullable: true,
                oldClrType: typeof(DateTimeOffset));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "LastLoggedInDate",
                table: "Users",
                nullable: true,
                oldClrType: typeof(DateTimeOffset));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Events",
                nullable: false,
                oldClrType: typeof(byte));

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Events",
                nullable: false,
                oldClrType: typeof(byte));

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Events",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "IsActive", "IsDeleted" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 18, 46, 51, 824, DateTimeKind.Unspecified).AddTicks(9120), new TimeSpan(0, 0, 0, 0, 0)), false, false });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "LastLoggedInDate", "ResetPasswordExpirationDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 14, 46, 51, 824, DateTimeKind.Unspecified).AddTicks(7260), new TimeSpan(0, -4, 0, 0, 0)), null, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "LastLoggedInDate", "ResetPasswordExpirationDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 5, 14, 46, 51, 812, DateTimeKind.Unspecified).AddTicks(7840), new TimeSpan(0, -4, 0, 0, 0)), null, null });

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_CreatedById",
                table: "Events",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_CreatedById",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "UserRole",
                table: "Users",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Events",
                newName: "isDeleted");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Events",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Events_CreatedById",
                table: "Events",
                newName: "IX_Events_CreatedBy");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "ResetPasswordExpirationDate",
                table: "Users",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "LastLoggedInDate",
                table: "Users",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "isDeleted",
                table: "Events",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<byte>(
                name: "IsActive",
                table: "Events",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "IsActive", "isDeleted" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 4, 2, 28, 33, 320, DateTimeKind.Unspecified).AddTicks(6292), new TimeSpan(0, 0, 0, 0, 0)), (byte)0, (byte)0 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "LastLoggedInDate", "ResetPasswordExpirationDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 3, 22, 28, 33, 320, DateTimeKind.Unspecified).AddTicks(4952), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "LastLoggedInDate", "ResetPasswordExpirationDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 7, 3, 22, 28, 33, 314, DateTimeKind.Unspecified).AddTicks(8692), new TimeSpan(0, -4, 0, 0, 0)), new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_CreatedBy",
                table: "Events",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
