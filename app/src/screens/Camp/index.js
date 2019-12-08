/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect} from 'react'
import {Row, Col} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {counselorActions, cabinActions, userActions} from '@/actions'

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

  useEffect(() => {
    counselorStats.load()
    cabinStats.load()
    userStats.load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const statWidths = {
    xl: 6,
    lg: 6,
    md: 8,
    sm: 24,
  }

  return (
    <MainContent>
      <h1>Camp Management</h1>

      <Row gutter={16}>
        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: counselorStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Counselors" value={counselorStats.data}>
              <div css={{textAlign: 'right', marginTop: 5}}>
                <NavItem routeName={page.counselorsPage}>
                  View Counselors >
                </NavItem>
              </div>
            </Stat>
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: cabinStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Cabins" value={cabinStats.data}>
              <div css={{textAlign: 'right', marginTop: 5}}>
                <NavItem routeName={page.cabinsPage}>View Cabins ></NavItem>
              </div>
            </Stat>
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: userStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Users" value={userStats.data}>
              <div css={{textAlign: 'right', marginTop: 5}}>
                <NavItem routeName={page.usersPage}>View Users ></NavItem>
              </div>
            </Stat>
          </LoaderContext.Provider>
        </Col>
      </Row>
    </MainContent>
  )
}

export default CampPage
