/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect} from 'react'
import {Row, Col} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {
  counselorActions,
  cabinActions,
  userActions,
  snackShopItemActions,
  couponActions,
  customFieldActions,
} from '@/actions'

import {NavItem} from '@/components/Navigation'
import MainContent from '@/components/MainContent'
import Stat from '@/screens/Dashboard/components/Stat'
import {LoaderContext} from '@/components/Structure/Loader'

const CampPage = () => {
  useTitle('Camp Management')

  const page = usePage()

  const counselorStats = useAsyncLoad(counselorActions.loadCounselorStats)
  const cabinStats = useAsyncLoad(cabinActions.loadCabinStats)
  const userStats = useAsyncLoad(userActions.loadUserStats)
  const snackShopItemStats = useAsyncLoad(
    snackShopItemActions.loadSnackShopItemStats,
  )
  const couponStats = useAsyncLoad(couponActions.loadCouponStats)
  const customFieldStats = useAsyncLoad(customFieldActions.loadCustomFieldStats)

  useEffect(() => {
    counselorStats.load()
    cabinStats.load()
    userStats.load()
    snackShopItemStats.load()
    couponStats.load()
    customFieldStats.load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const statWidths = {
    xl: 6,
    lg: 6,
    md: 8,
    sm: 24,
  }

  const stats = [
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
    {
      data: customFieldStats,
      page: page.customFieldsPage,
      title: 'Custom Fields',
    },
  ]

  return (
    <MainContent>
      <h1>Camp Management</h1>

      <Row gutter={16}>
        {stats.map((stat, index) => (
          <Col key={index} {...statWidths}>
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

      <h1>Other Links</h1>

      <ul>
        <li>
          <NavItem routeName="camp.import">Import Data</NavItem>
        </li>
        <li>
          <NavItem routeName="camp.settings">Settings</NavItem>
        </li>
      </ul>
    </MainContent>
  )
}

export default CampPage
