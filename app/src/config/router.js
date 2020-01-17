import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

const routes = [
  {name: 'notFound', path: '/404'},
  {name: 'signin', path: '/'},
  {
    name: 'forgotPassword',
    path: '/forgot-password',
  },
  {
    name: 'resetPassword',
    path: '/reset-password?userId&token',
  },
  {
    name: 'dashboard',
    path: '/dashboard',
  },
  {
    name: 'events',
    path: '/events',
    children: [
      {
        name: 'add',
        path: '/add',
      },
      {
        name: 'edit',
        path: '/edit/:eventId',
      },
      {
        name: 'user',
        path: '/user/:userId',
      },
    ],
  },
  {
    name: 'visitors',
    path: '/visitors',
    children: [
      {
        name: 'campers',
        path: '/campers',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:camperId',
            children: [
              {
                name: 'snackShop',
                path: '/snack-shop',
              },
            ],
          },
          {
            name: 'coupon',
            path: '/coupon',
          },
        ],
      },
      {
        name: 'groups',
        path: '/groups',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:groupId',
          },
          {
            name: 'user',
            path: '/user',
          },
        ],
      },
      {
        name: 'registrations',
        path: '/registrations',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:registrationId',
          },
          {
            name: 'camper',
            path: '/camper/:camperId',
          },
          {
            name: 'event',
            path: '/event/:eventId',
          },
        ],
      },
    ],
  },
  {
    name: 'camp',
    path: '/camp',
    children: [
      {
        name: 'counselors',
        path: '/counselors',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:counselorId',
            children: [
              {
                name: 'snackShop',
                path: '/snack-shop',
              },
            ],
          },
          {
            name: 'user',
            path: '/user',
          },
          {
            name: 'cabin',
            path: '/cabin',
          },
        ],
      },
      {
        name: 'cabins',
        path: '/cabins',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:cabinId',
          },
        ],
      },
      {
        name: 'users',
        path: '/users',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:userId',
          },
        ],
      },
      {
        name: 'snackShopItems',
        path: '/snack-shop-items',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:snackShopItemId',
          },
        ],
      },
      {
        name: 'coupons',
        path: '/coupons',
        children: [
          {
            name: 'add',
            path: '/add',
          },
          {
            name: 'edit',
            path: '/edit/:couponId',
          },
        ],
      },
      {
        name: 'import',
        path: '/import',
      },
      {
        name: 'settings',
        path: '/settings',
      },
    ],
  },
  {
    name: 'register',
    path: '/register',
    children: [
      {
        name: 'event',
        path: '/event/:eventId',
      },
    ],
  },
]

const router = createRouter(routes, {
  allowNotFound: true,
  defaultRoute: 'notFound',
  queryParamsMode: 'loose',
})

router.usePlugin(browserPlugin())
router.start()

export default router
