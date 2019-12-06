/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect} from 'react'
import {Col, Row} from 'antd'

import Stat from './components/Stat'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {
  camperActions,
  counselorActions,
  eventActions,
  userActions,
  groupActions,
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
  const userStats = useAsyncLoad(userActions.loadUserStats)

  useEffect(() => {
    eventStats.load()
    camperStats.load()
    groupStats.load()
    counselorStats.load()
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
      <h1>Dashboard</h1>

      <Row gutter={16}>
        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: eventStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Events" value={eventStats.data}>
              <div css={{textAlign: 'right', marginTop: 5}}>
                <NavItem routeName={page.eventsPage}>View Events ></NavItem>
              </div>
            </Stat>
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: camperStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Campers" value={camperStats.data}>
              <div css={{textAlign: 'right', marginTop: 5}}>
                <NavItem routeName={page.campersPage}>View Campers ></NavItem>
              </div>
            </Stat>
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: groupStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Groups" value={groupStats.data}>
              <div css={{textAlign: 'right', marginTop: 5}}>
                <NavItem routeName={page.groupsPage}>View Groups ></NavItem>
              </div>
            </Stat>
          </LoaderContext.Provider>
        </Col>

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

export default Dashboard
