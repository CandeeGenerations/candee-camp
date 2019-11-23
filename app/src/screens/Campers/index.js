import React, {useEffect} from 'react'
import {useRoute} from 'react-router5'
import {Button, Card} from 'antd'

import {camperActions as actions} from '../../actions'

import useTitle from '../../helpers/hooks/useTitle'
import useAsyncLoad from '../../helpers/hooks/useAsyncLoad'

import PageHeader from '../../components/Structure/PageHeader'
import {LoaderContext} from '../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../components/ErrorBoundary/ErrorWrapper'

import CampersTable from './components/CampersTable'

const Campers = () => {
  const errorWrapper = useError()
  const routerContext = useRoute()
  const campers = useAsyncLoad(actions.loadCampers)

  useTitle('Campers')

  useEffect(() => {
    try {
      campers.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCamperClick = async camperId => {
    const response = await actions.deleteCamper(camperId)

    if (response) {
      campers.load()
    }
  }

  return (
    <>
      <section className="cc--main-content">
        <Card>
          <PageHeader
            actions={[
              <Button
                key="add"
                type="primary"
                onClick={() => routerContext.router.navigate('users.camper')}
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
              spinning: campers.loading,
              tip: 'Loading campers...',
            }}
          >
            <ErrorWrapper
              handleRetry={campers.load}
              hasError={errorWrapper.hasError}
            >
              <CampersTable
                campers={
                  (campers.results &&
                    campers.results.map(camper => ({
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
      </section>
    </>
  )
}

export default Campers
