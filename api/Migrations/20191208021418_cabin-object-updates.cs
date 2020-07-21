using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class cabinobjectupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "Cabins",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Cabins",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "Cabins",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

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

            migrationBuilder.CreateIndex(
                name: "IX_Cabins_CreatedBy",
                table: "Cabins",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Cabins_Users_CreatedBy",
                table: "Cabins",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cabins_Users_CreatedBy",
                table: "Cabins");

            migrationBuilder.DropIndex(
                name: "IX_Cabins_CreatedBy",
                table: "Cabins");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Cabins");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Cabins");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cabins",
                newName: "name");

            migrationBuilder.UpdateData(
                table: "Campers",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 879, DateTimeKind.Unspecified).AddTicks(4250), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 879, DateTimeKind.Unspecified).AddTicks(4280), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "Id",
                keyValue: -1,
                column: "CreatedDate",
                value: new DateTimeOffset(new DateTime(2019, 12, 5, 18, 53, 53, 878, DateTimeKind.Unspecified).AddTicks(5330), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 878, DateTimeKind.Unspecified).AddTicks(3140), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 878, DateTimeKind.Unspecified).AddTicks(3170), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 863, DateTimeKind.Unspecified).AddTicks(1820), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2019, 12, 5, 13, 53, 53, 875, DateTimeKind.Unspecified).AddTicks(6730), new TimeSpan(0, -5, 0, 0, 0)) });
        }
    }
}
