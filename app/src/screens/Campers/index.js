import React, {useContext, useEffect} from 'react'
import {useRoute} from 'react-router5'
import {Button, Card} from 'antd'

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

  return (
    <>
      <MainContent>
        <Card>
          <PageHeader
            actions={[
              <Button
                key="add"
                type="primary"
                onClick={() =>
                  routerContext.router.navigate(page.camperAddPage)
                }
              >
                Add Camper
              </Button>,
            ]}
            routes={[
              {path: '/dashboard', breadcrumbName: 'Dashboard'},
              {path: '/campers', breadcrumbName: 'Campers'},
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
                  (objectsContext.campers.results &&
                    objectsContext.campers.results.map(camper => ({
                      ...camper,
                      key: camper.id,
                    }))) ||
                  []
                }
                deleteCamper={handleDeleteCamperClick}
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isCamperAddOrEditPage && (
        <CamperView
          id={
            (routerContext.route.params &&
              routerContext.route.params.camperId) ||
            null
          }
          onDeleteCamper={handleDeleteCamperClick}
        />
      )}
    </>
  )
}

export default Campers
