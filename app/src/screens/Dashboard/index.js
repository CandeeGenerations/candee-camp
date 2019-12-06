import React, {useEffect} from 'react'
import {Col, Row} from 'antd'

import Stat from './components/Stat'

import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {
  camperActions,
  counselorActions,
  eventActions,
  userActions,
} from '@/actions'

import MainContent from '@/components/MainContent'
import {LoaderContext} from '@/components/Structure/Loader'

const Dashboard = () => {
  useTitle('Home')

  const userStats = useAsyncLoad(userActions.loadUserStats)
  const eventStats = useAsyncLoad(eventActions.loadEventStats)
  const camperStats = useAsyncLoad(camperActions.loadCamperStats)
  const counselorStats = useAsyncLoad(counselorActions.loadCounselorStats)

  useEffect(() => {
    userStats.load()
    eventStats.load()
    camperStats.load()
    counselorStats.load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const statWidths = {
    xl: 4,
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
            <Stat title="Events" value={eventStats.data} />
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: userStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Users" value={userStats.data} />
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: camperStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Campers" value={camperStats.data} />
          </LoaderContext.Provider>
        </Col>

        <Col {...statWidths}>
          <LoaderContext.Provider
            value={{spinning: counselorStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Counselors" value={counselorStats.data} />
          </LoaderContext.Provider>
        </Col>
      </Row>
    </MainContent>
  )
}

export default Dashboard
