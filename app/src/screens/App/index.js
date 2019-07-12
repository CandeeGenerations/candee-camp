import React from 'react'
import _ from 'lodash'
import {Layout} from 'antd'
import {useRoute} from 'react-router5'
import SimpleCrypto from 'simple-crypto-js'

import Config from '../../config'
import {axiosRequest} from '../../api'
import * as actions from '../../actions'
import {getUser} from '../../helpers/authHelpers'
import useAsyncLoad from '../../helpers/hooks/useAsyncLoad'

import Users from '../Users'
import Signin from '../Signin'
import Events from '../Events'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import ResetPassword from '../ResetPassword'
import NavBar from '../../components/NavBar'
import ForgotPassword from '../ForgotPassword'
import Version from '../../components/Version'
import UserView from '../Users/components/UserView'
import ErrorBoundary from '../../components/ErrorBoundary'

import '../../content/zmdi.less'
import '../../content/antd.less'

export const ObjectsContext = React.createContext({})

const App = () => {
  let content = null
  const user = getUser()
  const routerContext = useRoute()

  const routeName = routerContext.route.name
  const users = useAsyncLoad(actions.userActions.loadUsers)
  const events = useAsyncLoad(actions.eventActions.loadEvents)

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
  } else if (routeName.includes('events')) {
    content = <Events />
  } else if (routeName.includes('users')) {
    content = <Users />
  } else {
    content = <NotFound />
  }

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
              events,
              users,
            }}
          >
            {content}

            {(routeName === 'users.edit' ||
              routeName === 'users.add' ||
              routeName === 'events.user') && (
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
