import React, {useEffect} from 'react'
import {Col, Row} from 'antd'

import Stat from './components/Stat'

import useTitle from '@/helpers/hooks/useTitle'
import {eventActions, userActions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import MainContent from '@/components/MainContent'
import {LoaderContext} from '@/components/Structure/Loader'

const Dashboard = () => {
  useTitle('Home')

  const userStats = useAsyncLoad(userActions.loadUserStats)
  const eventStats = useAsyncLoad(eventActions.loadEventStats)

  useEffect(() => {
    // userStats.load()
    eventStats.load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainContent>
      <h1>Dashboard</h1>

      <Row gutter={16}>
        <Col span={8}>
          <LoaderContext.Provider
            value={{spinning: eventStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Events" value={eventStats.data} />
          </LoaderContext.Provider>
        </Col>

        <Col span={8}>
          <LoaderContext.Provider
            value={{spinning: userStats.loading, tip: 'Loading...'}}
          >
            <Stat title="Users" value={userStats.data} />
          </LoaderContext.Provider>
        </Col>
      </Row>
    </MainContent>
  )
}

export default Dashboard
