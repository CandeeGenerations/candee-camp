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
          },
          {
            name: 'user',
            path: '/user',
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
    ],
  },
]

const router = createRouter(routes, {
  allowNotFound: true,
  defaultRoute: 'notFound',
  queryParamsMode: 'loose',
})

router.usePlugin(browserPlugin({useHash: true}))
router.start()

export default router
