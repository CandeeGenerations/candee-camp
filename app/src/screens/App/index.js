import React from 'react'
import {Layout} from 'antd'
import {useRoute} from 'react-router5'

import {getUser} from '../../helpers/authHelpers'

import Users from '../Users'
import Signin from '../Signin'
import Events from '../Events'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import ResetPassword from '../ResetPassword'
import NavBar from '../../components/NavBar'
import ForgotPassword from '../ForgotPassword'
import Version from '../../components/Version'
import ErrorBoundary from '../../components/ErrorBoundary'

import './app.scss'
import '../../content/zmdi.less'
import '../../content/antd.less'

const {Content} = Layout

const App = () => {
  let content = null
  const routerContext = useRoute()
  const user = getUser()

  const testUnauthenticatedRoutes = () => {
    const unauthenticatedRoutes = ['signin', 'forgotPassword', 'resetPassword']
    let isUnauthenticated = false

    unauthenticatedRoutes.forEach(route => {
      isUnauthenticated =
        isUnauthenticated || routerContext.route.name.includes(route)
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
      isNoNav = isNoNav || routerContext.route.name.includes(route)
    })

    return isNoNav
  }

  const isUnauthenticatedRoute = testUnauthenticatedRoutes()

  if (!user && !isUnauthenticatedRoute) {
    routerContext.router.navigate('signin', {
      returnUrl: routerContext.route.name,
    })

    return (
      <>
        <Signin />
        <Version light />
      </>
    )
  }

  if (
    (user && isUnauthenticatedRoute) ||
    routerContext.route.name.includes('dashboard')
  ) {
    content = <Dashboard />
  } else if (routerContext.route.name.includes('signin')) {
    content = <Signin />
  } else if (routerContext.route.name.includes('forgotPassword')) {
    content = <ForgotPassword />
  } else if (routerContext.route.name.includes('resetPassword')) {
    content = <ResetPassword />
  } else if (routerContext.route.name.includes('events')) {
    content = <Events />
  } else if (routerContext.route.name.includes('users')) {
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
    <>
      <NavBar />

      <ErrorBoundary router={routerContext.route}>
        <Content className="cc--content-top">
          {content}

          <Version />
        </Content>
      </ErrorBoundary>
    </>
  )
}

export default App
