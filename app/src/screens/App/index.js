import React, {useContext} from 'react'
import {Layout} from 'antd'
import {routeContext} from 'react-router5'

import {getUser} from '../../helpers/authHelpers'

import Signin from '../Signin'
import Events from '../Events'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import ResetPassword from '../ResetPassword'
import NavBar from '../../components/NavBar'
import ForgotPassword from '../ForgotPassword'
import ErrorBoundary from '../../components/ErrorBoundary'

import './app.scss'
import '../../content/zmdi.less'
import '../../content/antd.less'

const {Content} = Layout

// const openNotification = (type: string, description: string) =>
//   notification[type]({
//     message: type === 'success' ? 'Success' : 'Error',
//     description,
//   })

const App = () => {
  let content = null
  const router = useContext(routeContext)
  const user = getUser()

  const testUnauthenticatedRoutes = () => {
    const unauthenticatedRoutes = ['signin', 'forgotPassword', 'resetPassword']
    let isUnauthenticated = false

    unauthenticatedRoutes.forEach(route => {
      isUnauthenticated = isUnauthenticated || router.route.name.includes(route)
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
      isNoNav = isNoNav || router.route.name.includes(route)
    })

    return isNoNav
  }

  const isUnauthenticatedRoute = testUnauthenticatedRoutes()

  if (!user && !isUnauthenticatedRoute) {
    router.router.navigate('signin', {returnUrl: router.route.name})
    return <Signin />
  }

  if (
    (user && isUnauthenticatedRoute) ||
    router.route.name.includes('dashboard')
  ) {
    content = <Dashboard />
  } else if (router.route.name.includes('signin')) {
    content = <Signin />
  } else if (router.route.name.includes('forgotPassword')) {
    content = <ForgotPassword />
  } else if (router.route.name.includes('resetPassword')) {
    content = <ResetPassword />
  } else if (router.route.name.includes('events')) {
    content = <Events />
  } else {
    content = <NotFound />
  }

  return testNoNavRoutes() && !(user && isUnauthenticatedRoute) ? (
    content
  ) : (
    <div style={{display: 'inline'}}>
      <NavBar />

      <ErrorBoundary router={router.route}>
        <Content className="cc--content-top">{content}</Content>
      </ErrorBoundary>
    </div>
  )
}

App.defaultProps = {
  route: {name: ''},
}

export default App
