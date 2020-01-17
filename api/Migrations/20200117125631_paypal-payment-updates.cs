using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CandeeCamp.API.Migrations
{
    public partial class paypalpaymentupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Users_UserId",
                table: "Payments_Donations");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Payments_Donations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Payments_Donations",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RegistrationId",
                table: "Payments_Donations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PayPal_Payments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PayPalId = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTimeOffset>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: true),
                    PayerId = table.Column<string>(nullable: true),
                    PaymentDonationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayPal_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayPal_Payments_Payments_Donations_PaymentDonationId",
                        column: x => x.PaymentDonationId,
                        principalTable: "Payments_Donations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "QtnNNRwkSqPCpH4FNS5kcwfe6hCmP1");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 7, 56, 31, 76, DateTimeKind.Unspecified).AddTicks(1520), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 7, 56, 31, 91, DateTimeKind.Unspecified).AddTicks(5550), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_Donations_RegistrationId",
                table: "Payments_Donations",
                column: "RegistrationId");

            migrationBuilder.CreateIndex(
                name: "IX_PayPal_Payments_PaymentDonationId",
                table: "PayPal_Payments",
                column: "PaymentDonationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Donations_Registrations_RegistrationId",
                table: "Payments_Donations",
                column: "RegistrationId",
                principalTable: "Registrations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Donations_Users_UserId",
                table: "Payments_Donations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Registrations_RegistrationId",
                table: "Payments_Donations");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Users_UserId",
                table: "Payments_Donations");

            migrationBuilder.DropTable(
                name: "PayPal_Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_Donations_RegistrationId",
                table: "Payments_Donations");

            migrationBuilder.DropColumn(
                name: "RegistrationId",
                table: "Payments_Donations");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Payments_Donations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Payments_Donations",
                type: "decimal(65,30)",
                nullable: true,
                oldClrType: typeof(decimal));

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
                name: "FK_Payments_Donations_Users_UserId",
                table: "Payments_Donations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
