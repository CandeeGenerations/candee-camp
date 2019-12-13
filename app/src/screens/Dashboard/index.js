/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect} from 'react'
import {Col, Row} from 'antd'

import Stat from './components/Stat'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {
  eventActions,
  camperActions,
  groupActions,
  counselorActions,
  cabinActions,
  userActions,
  snackShopItemActions,
  couponActions,
} from '@/actions'

import {NavItem} from '@/components/Navigation'
import MainContent from '@/components/MainContent'
import {LoaderContext} from '@/components/Structure/Loader'

const Dashboard = () => {
  useTitle('Home')

  const page = usePage()

  const eventStats = useAsyncLoad(eventActions.loadEventStats)
  const camperStats = useAsyncLoad(camperActions.loadCamperStats)
  const groupStats = useAsyncLoad(groupActions.loadGroupStats)
  const counselorStats = useAsyncLoad(counselorActions.loadCounselorStats)
  const cabinStats = useAsyncLoad(cabinActions.loadCabinStats)
  const userStats = useAsyncLoad(userActions.loadUserStats)
  const snackShopItemStats = useAsyncLoad(
    snackShopItemActions.loadSnackShopItemStats,
  )
  const couponStats = useAsyncLoad(couponActions.loadCouponStats)

  useEffect(() => {
    eventStats.load()
    camperStats.load()
    groupStats.load()
    counselorStats.load()
    cabinStats.load()
    snackShopItemStats.load()
    userStats.load()
    couponStats.load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const statWidths = {
    xl: 6,
    lg: 6,
    md: 8,
    sm: 24,
  }

  const stats = [
    {
      data: eventStats,
      page: page.eventsPage,
      title: 'Events',
    },
    {
      data: camperStats,
      page: page.campersPage,
      title: 'Campers',
    },
    {
      data: groupStats,
      page: page.groupsPage,
      title: 'Groups',
    },
    {
      data: counselorStats,
      page: page.counselorsPage,
      title: 'Counselors',
    },
    {
      data: cabinStats,
      page: page.cabinsPage,
      title: 'Cabins',
    },
    {
      data: userStats,
      page: page.usersPage,
      title: 'Users',
    },
    {
      data: snackShopItemStats,
      page: page.snackShopItemsPage,
      title: 'Snack Shop Items',
    },
    {
      data: couponStats,
      page: page.couponsPage,
      title: 'Coupons',
    },
  ]

  return (
    <MainContent>
      <h1>Dashboard</h1>

      <Row gutter={16}>
        {stats.map(stat => (
          <Col {...statWidths}>
            <LoaderContext.Provider
              value={{spinning: stat.data.loading, tip: 'Loading...'}}
            >
              <Stat title={stat.title} value={stat.data.data}>
                <div css={{textAlign: 'right', marginTop: 5}}>
                  <NavItem routeName={stat.page}>View {stat.title} ></NavItem>
                </div>
              </Stat>
            </LoaderContext.Provider>
          </Col>
        ))}
      </Row>
    </MainContent>
  )
}

export default Dashboard
