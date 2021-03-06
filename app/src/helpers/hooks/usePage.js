import {useRoute} from 'react-router5'

export default () => {
  const routerContext = useRoute()
  const routeName = routerContext.route.name

  return {
    // checks : return bool
    // events
    isEventAddPage: routeName.includes('events.add'),
    isEventEditPage: routeName.includes('events.edit'),
    isEventAddOrEditPage:
      routeName.includes('events.add') ||
      routeName.includes('events.edit') ||
      routeName.includes('visitors.registrations.event'),
    isEventUserEditPage: routeName.includes('events.user'),

    isVisitorsPages: routeName.includes('visitors'),

    // campers
    isCamperAddPage: routeName.includes('visitors.campers.add'),
    isCamperEditPage: routeName.includes('visitors.campers.edit'),
    isCamperAddOrEditPage:
      routeName.includes('visitors.campers.add') ||
      (routeName.includes('visitors.campers.edit') &&
        !routeName.includes('visitors.campers.edit.snackShop')),
    isCamperCouponAddPage: routeName.includes('visitors.campers.coupon'),

    // camper - snack shop
    isCamperSnackShopPage: routeName.includes(
      'visitors.campers.edit.snackShop',
    ),

    // groups
    isGroupAddPage: routeName.includes('visitors.groups.add'),
    isGroupEditPage: routeName.includes('visitors.groups.edit'),
    isGroupAddOrEditPage:
      routeName.includes('visitors.groups.add') ||
      routeName.includes('visitors.groups.edit'),
    isGroupUserAddPage: routeName.includes('visitors.groups.user'),

    // registrations
    isRegistrationAddPage: routeName.includes('visitors.registrations.add'),
    isRegistrationEditPage: routeName.includes('visitors.registrations.edit'),
    isRegistrationAddOrEditPage:
      routeName.includes('visitors.registrations.add') ||
      routeName.includes('visitors.registrations.edit'),
    isRegistrationEventEditPage: routeName.includes(
      'visitors.registrations.event',
    ),

    isCampPages: routeName.includes('camp'),

    // counselors
    isCounselorAddPage: routeName.includes('camp.counselors.add'),
    isCounselorEditPage: routeName.includes('camp.counselors.edit'),
    isCounselorAddOrEditPage:
      routeName.includes('camp.counselors.add') ||
      routeName.includes('camp.counselors.edit'),
    isCounselorUserAddPage: routeName.includes('camp.counselors.user'),
    isCounselorCabinAddPage: routeName.includes('camp.counselors.cabin'),

    // counselor - snack shop
    isCounselorSnackShopPage: routeName.includes(
      'camp.counselors.edit.snackShop',
    ),

    // cabins
    isCabinAddPage: routeName.includes('camp.cabins.add'),
    isCabinEditPage: routeName.includes('camp.cabins.edit'),
    isCabinAddOrEditPage:
      routeName.includes('camp.cabins.add') ||
      routeName.includes('camp.cabins.edit') ||
      routeName.includes('camp.counselors.cabin'),

    // users
    isUserAddPage: routeName.includes('camp.users.add'),
    isUserEditPage: routeName.includes('camp.users.edit'),
    isUserAddOrEditPage:
      routeName.includes('events.user') ||
      routeName.includes('visitors.groups.user') ||
      routeName.includes('camp.counselors.user') ||
      routeName.includes('camp.users.add') ||
      routeName.includes('camp.users.edit'),

    // snack shop items
    isSnackShopItemAddPage: routeName.includes('camp.snackShopItems.add'),
    isSnackShopItemEditPage: routeName.includes('camp.snackShopItems.edit'),
    isSnackShopItemAddOrEditPage:
      routeName.includes('camp.snackShopItems.add') ||
      routeName.includes('camp.snackShopItems.edit'),

    // coupons
    isCouponAddPage: routeName.includes('camp.coupons.add'),
    isCouponEditPage: routeName.includes('camp.coupons.edit'),
    isCouponAddOrEditPage:
      routeName.includes('camp.coupons.add') ||
      routeName.includes('camp.coupons.edit') ||
      routeName.includes('visitors.campers.coupon'),

    // custom fields
    isCustomFieldAddPage: routeName.includes('camp.customFields.add'),
    isCustomFieldEditPage: routeName.includes('camp.customFields.edit'),
    isCustomFieldAddOrEditPage:
      routeName.includes('camp.customFields.add') ||
      routeName.includes('camp.customFields.edit'),

    // register
    // event
    isEventRegisterPage: routeName.includes('register.event'),

    // values : return string
    // events
    eventsPage: 'events',
    eventAddPage: 'events.add',
    eventEditPage: 'events.edit',
    eventUserEditPage: 'events.user',

    // visitors
    visitorsPage: 'visitors',

    // campers
    campersPage: 'visitors.campers',
    camperAddPage: 'visitors.campers.add',
    camperEditPage: 'visitors.campers.edit',
    camperCouponAddPage: 'visitors.campers.coupon',

    // camper - snack shop
    camperSnackShopPage: 'visitors.campers.edit.snackShop',

    // groups
    groupsPage: 'visitors.groups',
    groupAddPage: 'visitors.groups.add',
    groupEditPage: 'visitors.groups.edit',
    groupUserAddPage: 'visitors.groups.user',

    // registrations
    registrationsPage: 'visitors.registrations',
    registrationAddPage: 'visitors.registrations.add',
    registrationEditPage: 'visitors.registrations.edit',
    registrationEventEditPage: 'visitors.registrations.event',

    // camp
    campPage: 'camp',

    // counselors
    counselorsPage: 'camp.counselors',
    counselorAddPage: 'camp.counselors.add',
    counselorEditPage: 'camp.counselors.edit',
    counselorUserAddPage: 'camp.counselors.user',
    counselorCabinAddPage: 'camp.counselors.cabin',

    // counselor - snack shop
    counselorSnackShopPage: 'camp.counselors.edit.snackShop',

    // cabins
    cabinsPage: 'camp.cabins',
    cabinAddPage: 'camp.cabins.add',
    cabinEditPage: 'camp.cabins.edit',

    // users
    usersPage: 'camp.users',
    userAddPage: 'camp.users.add',
    userEditPage: 'camp.users.edit',

    // snack shop items
    snackShopItemsPage: 'camp.snackShopItems',
    snackShopItemAddPage: 'camp.snackShopItems.add',
    snackShopItemEditPage: 'camp.snackShopItems.edit',

    // coupons
    couponsPage: 'camp.coupons',
    couponAddPage: 'camp.coupons.add',
    couponEditPage: 'camp.coupons.edit',

    // custom fields
    customFieldsPage: 'camp.customFields',
    customFieldAddPage: 'camp.customFields.add',
    customFieldEditPage: 'camp.customFields.edit',

    importPage: 'camp.import',
    settingsPage: 'camp.settings',

    // register
    // events
    eventRegisterPage: 'register.event',
  }
}
