export class Constants {
  static TableOptions = {
    PaginationOptions: {
      defaultPageSize: 25,
      pageSizeOptions: ['10', '25', '50', '100'],
      showSizeChanger: true,
    },
  }

  static Roles = {
    FullAdmin: 0,
    Admin: 1,
    Manager: 2,
    ReadOnly: 3,
  }

  static Headers = {
    1: ['Name'], // cabins
    2: ['Name', 'Code', 'ExpirationDate'], // coupons
  }

  static SettingKeys = {
    Name: 0,
    PayPalClientId: 1,
  }
}
