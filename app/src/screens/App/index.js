import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Layout, notification} from 'antd'
import {startsWithSegment} from 'router5-helpers'
import {createRouteNodeSelector} from 'redux-router5'

import {notificationActions as actions} from '../../actions'

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

type Props = {
  errors: [],
  route?: {name: string},
  successes: [],

  // functions
  clearErrors: () => void,
  clearSuccesses: () => void,
}

const openNotification = (type: string, description: string) =>
  notification[type]({
    message: type === 'success' ? 'Success' : 'Error',
    description,
  })

const testUnauthenticatedRoutes = testRoute => {
  const unauthenticatedRoutes = ['signin', 'forgotPassword', 'resetPassword']
  let isUnauthenticated = false

  unauthenticatedRoutes.forEach(route => {
    isUnauthenticated = isUnauthenticated || testRoute(route)
  })

  return isUnauthenticated
}

const testNoNavRoutes = testRoute => {
  const noNavRoutes = ['signin', 'forgotPassword', 'resetPassword', 'notFound']
  let isNoNav = false

  noNavRoutes.forEach(route => {
    isNoNav = isNoNav || testRoute(route)
  })

  return isNoNav
}

const App = (props: Props) => {
  useEffect(() => {
    if (!props.errors) return
    props.errors.map(error => openNotification('error', error))
    props.clearErrors()
  }, [{errors: props.errors}])

  useEffect(() => {
    if (!props.successes) return
    props.successes.map(success => openNotification('success', success))
    props.clearSuccesses()
  }, [{successes: props.success}])

  let content = null
  const user = getUser()
  const testRoute = startsWithSegment(props.route.name)
  const isUnauthenticatedRoute = testUnauthenticatedRoutes(testRoute)

  if (!user && !isUnauthenticatedRoute) {
    return <Signin />
  }

  if ((user && isUnauthenticatedRoute) || testRoute('dashboard')) {
    content = <Dashboard />
  } else if (testRoute('signin')) {
    content = <Signin />
  } else if (testRoute('forgotPassword')) {
    content = <ForgotPassword />
  } else if (testRoute('resetPassword')) {
    content = <ResetPassword />
  } else if (testRoute('events')) {
    content = <Events />
  } else {
    content = <NotFound />
  }

  return testNoNavRoutes(testRoute) && !(user && isUnauthenticatedRoute) ? (
    content
  ) : (
    <div style={{display: 'inline'}}>
      <NavBar />

      <ErrorBoundary>
        <Content className="cc--content-top">{content}</Content>
      </ErrorBoundary>
    </div>
  )
}

App.defaultProps = {
  route: {name: ''},
}

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
  errors: state.notifications.errors,
  successes: state.notifications.successes,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearErrors: actions.clearErrors,
      clearSuccesses: actions.clearSuccesses,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
