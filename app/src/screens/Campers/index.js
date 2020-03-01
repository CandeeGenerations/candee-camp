import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import CamperView from './components/CamperView'
import CampersTable from './components/CampersTable'

import {camperActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Campers = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Campers')

  useEffect(() => {
    try {
      objectsContext.campers.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCamperClick = async camperId => {
    const response = await actions.deleteCamper(camperId)

    if (response) {
      objectsContext.campers.load()
    }
  }

  const campers = objectsContext.campers.results

  return (
    <>
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
                      campers.map(camper => ({
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
    </>
  )
}

export default Campers
