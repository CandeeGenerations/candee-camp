using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Reclaimed.API.Migrations
{
    public partial class fixpaymentkeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationPayments_Payments_Donations_Id",
                table: "RegistrationPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPayments_Payments_Donations_Id",
                table: "UserPayments");

            migrationBuilder.UpdateData(
                table: "AuthClients",
                keyColumn: "Id",
                keyValue: 1,
                column: "ClientSecret",
                value: "UELRCv0gUwlAoVdjYvC1taYgiBlSIU");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2020, 1, 17, 10, 52, 57, 767, DateTimeKind.Unspecified).AddTicks(4100), new TimeSpan(0, -5, 0, 0, 0)), new DateTimeOffset(new DateTime(2020, 1, 17, 10, 52, 57, 790, DateTimeKind.Unspecified).AddTicks(3100), new TimeSpan(0, -5, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_UserPayments_PaymentDonationId",
                table: "UserPayments",
                column: "PaymentDonationId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationPayments_PaymentDonationId",
                table: "RegistrationPayments",
                column: "PaymentDonationId");

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationPayments_Payments_Donations_PaymentDonationId",
                table: "RegistrationPayments",
                column: "PaymentDonationId",
                principalTable: "Payments_Donations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPayments_Payments_Donations_PaymentDonationId",
                table: "UserPayments",
                column: "PaymentDonationId",
                principalTable: "Payments_Donations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationPayments_Payments_Donations_PaymentDonationId",
                table: "RegistrationPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPayments_Payments_Donations_PaymentDonationId",
                table: "UserPayments");

            migrationBuilder.DropIndex(
                name: "IX_UserPayments_PaymentDonationId",
                table: "UserPayments");

            migrationBuilder.DropIndex(
                name: "IX_RegistrationPayments_PaymentDonationId",
                table: "RegistrationPayments");

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

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationPayments_Payments_Donations_Id",
                table: "RegistrationPayments",
                column: "Id",
                principalTable: "Payments_Donations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPayments_Payments_Donations_Id",
                table: "UserPayments",
                column: "Id",
                principalTable: "Payments_Donations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
