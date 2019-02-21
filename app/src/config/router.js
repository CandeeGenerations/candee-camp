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
    path: '/reset-password?token',
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
