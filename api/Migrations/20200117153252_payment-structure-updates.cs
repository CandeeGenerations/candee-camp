using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class paymentstructureupdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayPal_Payment_Payments_Donations_PaymentDonationId",
                table: "PayPal_Payment");
            
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Registrations_RegistrationId",
                table: "Payments_Donations");

            migrationBuilder.DropIndex(
                name: "IX_Payments_Donations_RegistrationId",
                table: "Payments_Donations");
            
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Users_UserId",
                table: "Payments_Donations");

            migrationBuilder.DropIndex(
                name: "IX_Payments_Donations_UserId",
                table: "Payments_Donations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PayPal_Payment",
                table: "PayPal_Payment");

            migrationBuilder.RenameTable(
                name: "PayPal_Payment",
                newName: "PayPal_Payments");

            migrationBuilder.RenameIndex(
                name: "IX_PayPal_Payment_PaymentDonationId",
                table: "PayPal_Payments",
                newName: "IX_PayPal_Payments_PaymentDonationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PayPal_Payments",
                table: "PayPal_Payments",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "RegistrationPayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PaymentDonationId = table.Column<int>(nullable: false),
                    RegistrationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrationPayments_Payments_Donations_Id",
                        column: x => x.Id,
                        principalTable: "Payments_Donations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistrationPayments_Registrations_RegistrationId",
                        column: x => x.RegistrationId,
                        principalTable: "Registrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PaymentDonationId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPayments_Payments_Donations_Id",
                        column: x => x.Id,
                        principalTable: "Payments_Donations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPayments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "iWk6AXR5x1nnkO59X9sRdOCPXLqHyR");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 10, 32, 51, 848, DateTimeKind.Unspecified).AddTicks(1550), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 10, 32, 51, 864, DateTimeKind.Unspecified).AddTicks(1810), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationPayments_RegistrationId",
                table: "RegistrationPayments",
                column: "RegistrationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPayments_UserId",
                table: "UserPayments",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Donations_Registrations_Id",
                table: "Payments_Donations",
                column: "Id",
                principalTable: "Registrations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Donations_Users_Id",
                table: "Payments_Donations",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PayPal_Payments_Payments_Donations_PaymentDonationId",
                table: "PayPal_Payments",
                column: "PaymentDonationId",
                principalTable: "Payments_Donations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Registrations_Id",
                table: "Payments_Donations");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Donations_Users_Id",
                table: "Payments_Donations");

            migrationBuilder.DropForeignKey(
                name: "FK_PayPal_Payments_Payments_Donations_PaymentDonationId",
                table: "PayPal_Payments");

            migrationBuilder.DropTable(
                name: "RegistrationPayments");

            migrationBuilder.DropTable(
                name: "UserPayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PayPal_Payments",
                table: "PayPal_Payments");

            migrationBuilder.RenameTable(
                name: "PayPal_Payments",
                newName: "PayPal_Payment");

            migrationBuilder.RenameIndex(
                name: "IX_PayPal_Payments_PaymentDonationId",
                table: "PayPal_Payment",
                newName: "IX_PayPal_Payment_PaymentDonationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PayPal_Payment",
                table: "PayPal_Payment",
                column: "Id");

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
                name: "IX_Payments_Donations_UserId",
                table: "Payments_Donations",
                column: "UserId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_PayPal_Payment_Payments_Donations_PaymentDonationId",
                table: "PayPal_Payment",
                column: "PaymentDonationId",
                principalTable: "Payments_Donations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
