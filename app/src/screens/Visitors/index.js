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

  return (
    <MainContent>
      <h1>Visitors</h1>

      <Row gutter={16}>
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
      </Row>
    </MainContent>
  )
}

export default CampPage
