/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect} from 'react'
import {Row, Col} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import {camperActions, groupActions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import {NavItem} from '@/components/Navigation'
import MainContent from '@/components/MainContent'
import Stat from '@/screens/Dashboard/components/Stat'
import {LoaderContext} from '@/components/Structure/Loader'

const CampPage = () => {
  useTitle('Visitors')

  const page = usePage()

  const camperStats = useAsyncLoad(camperActions.loadCamperStats)
  const groupStats = useAsyncLoad(groupActions.loadGroupStats)

  useEffect(() => {
    camperStats.load()
    groupStats.load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const statWidths = {
    xl: 6,
    lg: 6,
    md: 8,
    sm: 24,
  }

  const stats = [
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
  ]

  return (
    <MainContent>
      <h1>Visitors</h1>

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
    </MainContent>
  )
}

export default CampPage
