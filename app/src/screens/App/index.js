import React from 'react'
import _ from 'lodash'
import {Layout} from 'antd'
import {useRoute} from 'react-router5'
import SimpleCrypto from 'simple-crypto-js'

import Config from '@/config'
import {axiosRequest} from '@/api'
import * as actions from '@/actions'
import usePage from '@/helpers/hooks/usePage'
import {getUser} from '@/helpers/authHelpers'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import Users from '@/screens/Users'
import Signin from '@/screens/Signin'
import Events from '@/screens/Events'
import Campers from '@/screens/Campers'
import NavBar from '@/components/NavBar'
import NotFound from '@/screens/NotFound'
import Version from '@/components/Version'
import Dashboard from '@/screens/Dashboard'
import ResetPassword from '@/screens/ResetPassword'
import ForgotPassword from '@/screens/ForgotPassword'
import ErrorBoundary from '@/components/ErrorBoundary'
import UserView from '@/screens/Users/components/UserView'

export const ObjectsContext = React.createContext({})

const App = () => {
  let content = null
  const page = usePage()
  const user = getUser()
  const routerContext = useRoute()

  const routeName = routerContext.route.name
  const users = useAsyncLoad(actions.userActions.loadUsers)
  const events = useAsyncLoad(actions.eventActions.loadEvents)
  const campers = useAsyncLoad(actions.camperActions.loadCampers)

  if (user) {
    axiosRequest.defaults.headers.common.Authorization = `Bearer ${user.access_token}`
  }

  const testUnauthenticatedRoutes = () => {
    const unauthenticatedRoutes = ['signin', 'forgotPassword', 'resetPassword']
    let isUnauthenticated = false

    unauthenticatedRoutes.forEach(route => {
      isUnauthenticated = isUnauthenticated || routeName.includes(route)
    })

    return isUnauthenticated
  }

  const testNoNavRoutes = () => {
    const noNavRoutes = [
      'signin',
      'forgotPassword',
      'resetPassword',
      'notFound',
    ]
    let isNoNav = false

    noNavRoutes.forEach(route => {
      isNoNav = isNoNav || routeName.includes(route)
    })

    return isNoNav
  }

  const isUnauthenticatedRoute = testUnauthenticatedRoutes()

  if (!user && !isUnauthenticatedRoute) {
    const returnParams = _.isEmpty(routerContext.route.params)
      ? {}
      : {returnParams: JSON.stringify(routerContext.route.params)}
    const simpleCrypto = new SimpleCrypto(Config.cryptoKey)
    const params = simpleCrypto.encrypt(
      JSON.stringify({
        returnUrl: routeName,
        ...returnParams,
      }),
    )

    routerContext.router.navigate('signin', {p: params})

    return (
      <>
        <Signin />
        <Version light />
      </>
    )
  }

  if ((user && isUnauthenticatedRoute) || routeName.includes('dashboard')) {
    content = <Dashboard />
  } else if (routeName.includes('signin')) {
    content = <Signin />
  } else if (routeName.includes('forgotPassword')) {
    content = <ForgotPassword />
  } else if (routeName.includes('resetPassword')) {
    content = <ResetPassword />
  } else if (routeName.includes(page.eventsPage)) {
    content = <Events />
  } else if (routeName.includes(page.usersPage)) {
    content = <Users />
  } else if (routeName.includes(page.campersPage)) {
    content = <Campers />
  } else {
    content = <NotFound />
  }

  const userViewRoutes = [
    page.userEditPage,
    page.userAddPage,
    page.eventUserEditPage,
  ]

  return testNoNavRoutes() && !(user && isUnauthenticatedRoute) ? (
    <>
      {content}

      <Version light={isUnauthenticatedRoute} />
    </>
  ) : (
    <Layout>
      <NavBar />

      <Layout>
        <ErrorBoundary router={routerContext.route}>
          <ObjectsContext.Provider
            value={{
              campers,
              events,
              users,
            }}
          >
            {content}

            {userViewRoutes.includes(routeName) && (
              <UserView
                id={
                  (routerContext.route.params &&
                    routerContext.route.params.userId) ||
                  null
                }
              />
            )}
          </ObjectsContext.Provider>

          <Version />
        </ErrorBoundary>
      </Layout>
    </Layout>
  )
}

export default App
