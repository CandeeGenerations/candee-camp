import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {camperActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CamperView from './components/CamperView'
import CampersTable from './components/CampersTable'
import CamperFilters from './components/CamperFilters'

const Campers = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    camperFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Campers')

  const loadCampers = async () => {
    try {
      objectsContext.campers.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadCampers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCamperClick = async (camperId) => {
    const response = await actions.deleteCamper(camperId)

    if (response) {
      loadCampers()
    }
  }

  const campers = objectsContext.campers.results

  return (
    <React.Fragment>
      <Global
        styles={css`
          html {
            min-width: 1300px;
          }
        `}
      />

      {page.isCamperAddOrEditPage ? (
        <CamperView
          id={
            (routerContext.route.params &&
              routerContext.route.params.camperId) ||
            null
          }
        />
      ) : (
        <MainContent>
          <Card>
            <PageHeader
              actions={
                campers && campers.length > 0
                  ? [
                      <Button
                        key="add"
                        type="primary"
                        onClick={() =>
                          routerContext.router.navigate(page.camperAddPage)
                        }
                      >
                        Add Camper
                      </Button>,
                    ]
                  : []
              }
              routes={[
                {path: 'visitors', breadcrumbName: 'Visitors'},
                {path: 'visitors.campers', breadcrumbName: 'Campers'},
              ]}
              title="Campers"
            />

            <CamperFilters onApplyFilters={loadCampers} />

            <LoaderContext.Provider
              value={{
                spinning: objectsContext.campers.loading,
                tip: 'Loading campers...',
              }}
            >
              <ErrorWrapper
                handleRetry={objectsContext.campers.load}
                hasError={errorWrapper.hasError}
              >
                <CampersTable
                  campers={
                    (campers &&
                      campers.map((camper) => ({
                        ...camper,
                        key: camper.id,
                      }))) ||
                    []
                  }
                  deleteCamper={handleDeleteCamperClick}
                  onCreateCamper={() =>
                    routerContext.router.navigate(page.camperAddPage)
                  }
                />
              </ErrorWrapper>
            </LoaderContext.Provider>
          </Card>
        </MainContent>
      )}
    </React.Fragment>
  )
}

export default Campers
