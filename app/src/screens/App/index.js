/* eslint-disable max-statements */
/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react'
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
import Groups from '@/screens/Groups'
import Cabins from '@/screens/Cabins'
import Import from '@/screens/Import'
import CampPage from '@/screens/Camp'
import Coupons from '@/screens/Coupons'
import Campers from '@/screens/Campers'
import NavBar from '@/components/NavBar'
import NotFound from '@/screens/NotFound'
import Version from '@/components/Version'
import Dashboard from '@/screens/Dashboard'
import SnackShop from '@/screens/SnackShop'
import Counselors from '@/screens/Counselors'
import VisitorsPage from '@/screens/Visitors'
import Registrations from '@/screens/Registrations'
import ResetPassword from '@/screens/ResetPassword'
import SnackShopItems from '@/screens/SnackShopItems'
import ForgotPassword from '@/screens/ForgotPassword'
import ErrorBoundary from '@/components/ErrorBoundary'
import UserView from '@/screens/Users/components/UserView'
import CabinView from '@/screens/Cabins/components/CabinView'
import EventView from '@/screens/Events/components/EventView'
import CouponView from '@/screens/Coupons/components/CouponView'
import CamperView from '@/screens/Campers/components/CamperView'

export const ObjectsContext = React.createContext({})
export const ValuesContext = React.createContext({})

const App = () => {
  let content = null
  const page = usePage()
  const user = getUser()
  const routerContext = useRoute()

  const [camperValues, setCamperValues] = useState(undefined)
  const [groupValues, setGroupValues] = useState(undefined)
  const [counselorValues, setCounselorValues] = useState(undefined)

  const routeName = routerContext.route.name
  const events = useAsyncLoad(actions.eventActions.loadEvents)
  const campers = useAsyncLoad(actions.camperActions.loadCampers)
  const groups = useAsyncLoad(actions.groupActions.loadGroups)
  const registrations = useAsyncLoad(
    actions.registrationActions.loadRegistrations,
  )
  const counselors = useAsyncLoad(actions.counselorActions.loadCounselors)
  const cabins = useAsyncLoad(actions.cabinActions.loadCabins)
  const users = useAsyncLoad(actions.userActions.loadUsers)
  const snackShopItems = useAsyncLoad(
    actions.snackShopItemActions.loadSnackShopItems,
  )
  const coupons = useAsyncLoad(actions.couponActions.loadCoupons)

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
    const noNavRoutes = ['signin', 'forgotPassword', 'resetPassword']
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
    const paramsString = JSON.stringify({
      returnUrl: routeName,
      ...returnParams,
    })
    const params = simpleCrypto.encrypt(paramsString)

    routerContext.router.navigate('signin', {p: params})

    return (
      <>
        <Signin />

        <div css={{position: 'relative'}}>
          <Version light />
        </div>
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
  } else if (routeName === page.visitorsPage) {
    content = <VisitorsPage />
  } else if (
    routeName.includes(page.camperSnackShopPage) ||
    routeName.includes(page.counselorSnackShopPage)
  ) {
    content = <SnackShop />
  } else if (routeName.includes(page.campersPage)) {
    content = <Campers />
  } else if (routeName.includes(page.groupsPage)) {
    content = <Groups />
  } else if (routeName.includes(page.registrationsPage)) {
    content = <Registrations />
  } else if (routeName === page.campPage) {
    content = <CampPage />
  } else if (routeName.includes(page.counselorsPage)) {
    content = <Counselors />
  } else if (routeName.includes(page.cabinsPage)) {
    content = <Cabins />
  } else if (routeName.includes(page.usersPage)) {
    content = <Users />
  } else if (routeName.includes(page.snackShopItemsPage)) {
    content = <SnackShopItems />
  } else if (routeName.includes(page.couponsPage)) {
    content = <Coupons />
  } else if (routeName.includes('import')) {
    content = <Import />
  } else {
    content = <NotFound />
  }

  return testNoNavRoutes() && !(user && isUnauthenticatedRoute) ? (
    <>
      {content}

      <div css={{position: 'relative'}}>
        <Version light={isUnauthenticatedRoute} />
      </div>
    </>
  ) : (
    <Layout css={{backgroundColor: '#2a363e', margin: '0 10px'}}>
      <NavBar />

      <Layout css={{borderRadius: 20, margin: '10px 10px 10px 0'}}>
        <ErrorBoundary router={routerContext.route}>
          <ValuesContext.Provider
            value={{
              camperValues,
              groupValues,
              counselorValues,
              setCamperValues,
              setGroupValues,
              setCounselorValues,
            }}
          >
            <ObjectsContext.Provider
              value={{
                events,
                campers,
                groups,
                registrations,
                counselors,
                cabins,
                users,
                snackShopItems,
                coupons,
              }}
            >
              {content}

              {page.isUserAddOrEditPage && (
                <UserView
                  id={
                    (routerContext.route.params &&
                      routerContext.route.params.userId) ||
                    null
                  }
                />
              )}

              {page.isCamperAddOrEditPage && (
                <CamperView
                  id={
                    (routerContext.route.params &&
                      routerContext.route.params.camperId) ||
                    null
                  }
                />
              )}

              {page.isEventAddOrEditPage && (
                <EventView
                  id={
                    (routerContext.route.params &&
                      routerContext.route.params.eventId) ||
                    null
                  }
                />
              )}

              {page.isCabinAddOrEditPage && (
                <CabinView
                  id={
                    (routerContext.route.params &&
                      routerContext.route.params.cabinId) ||
                    null
                  }
                />
              )}

              {page.isCouponAddOrEditPage && (
                <CouponView
                  id={
                    (routerContext.route.params &&
                      routerContext.route.params.couponId) ||
                    null
                  }
                />
              )}
            </ObjectsContext.Provider>
          </ValuesContext.Provider>

          <Version />
        </ErrorBoundary>
      </Layout>
    </Layout>
  )
}

export default App
