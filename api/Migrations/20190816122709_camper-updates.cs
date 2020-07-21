using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class camperupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "LoginUser",
                table: "Campers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Campers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "CounselorId",
                table: "Campers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "CabinId",
                table: "Campers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "BirthDate",
                table: "Campers",
                nullable: true,
                oldClrType: typeof(DateTimeOffset));

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Campers",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "Campers",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "Campers",
                columns: new[] { "Id", "Allergies", "BirthDate", "CabinId", "CounselorId", "CreatedBy", "CreatedDate", "FirstName", "GroupId", "IsActive", "IsDeleted", "LastName", "LoginUser", "Medicine", "ParentFirstName", "ParentLastName", "UpdatedDate" },
                values: new object[] { -1, "Strawberries", new DateTimeOffset(new DateTime(2010, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -4, 0, 0, 0)), null, null, -1, new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 782, DateTimeKind.Unspecified).AddTicks(5910), new TimeSpan(0, -4, 0, 0, 0)), "Jocelyn", null, true, false, "Lacombe", null, "Ibuprofen", "John", "Lacombe", new DateTimeOffset(new DateTime(2019, 8, 16, 8, 27, 8, 782, DateTimeKind.Unspecified).AddTicks(5940), new TimeSpan(0, -4, 0, 0, 0)) });

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

            migrationBuilder.CreateIndex(
                name: "IX_Campers_CreatedBy",
                table: "Campers",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Cabins_CabinId",
                table: "Campers",
                column: "CabinId",
                principalTable: "Cabins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Counselors_CounselorId",
                table: "Campers",
                column: "CounselorId",
                principalTable: "Counselors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Users_CreatedBy",
                table: "Campers",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Groups_GroupId",
                table: "Campers",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Campers_Users_LoginUser",
                table: "Campers",
                column: "LoginUser",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
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
                name: "FK_Campers_Users_CreatedBy",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Groups_GroupId",
                table: "Campers");

            migrationBuilder.DropForeignKey(
                name: "FK_Campers_Users_LoginUser",
                table: "Campers");

            migrationBuilder.DropIndex(
                name: "IX_Campers_CreatedBy",
                table: "Campers");

            migrationBuilder.DeleteData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1);

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Campers");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Campers");

            migrationBuilder.AlterColumn<int>(
                name: "LoginUser",
                table: "Campers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Campers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CounselorId",
                table: "Campers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CabinId",
                table: "Campers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "BirthDate",
                table: "Campers",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);

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
        }
    }
}
