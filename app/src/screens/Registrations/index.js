import React, {useContext, useEffect} from 'react'
import _ from 'lodash'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {
  camperActions,
  eventActions,
  registrationActions as actions,
} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import RegistrationView from './components/RegistrationView'
import RegistrationsTable from './components/RegistrationsTable'

const Registrations = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const campers = useAsyncLoad(camperActions.loadCampersByIds)
  const events = useAsyncLoad(eventActions.loadEventsByIds)

  useTitle('Registrations')

  const loadRegistrations = async () => {
    try {
      const response = await objectsContext.registrations.load()

      if (response.data && response.data.length > 0) {
        const camperIds = _.uniq(response.data.map((x) => x.camperId))
        const eventIds = _.uniq(response.data.map((x) => x.eventId))

        campers.load(camperIds)
        events.load(eventIds)
      } else {
        campers.stopLoading()
        events.stopLoading()
      }
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadRegistrations()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      routerContext.previousRoute &&
      routerContext.previousRoute.name === page.registrationCamperEditPage
    ) {
      const camperIds = _.uniq(
        objectsContext.registrations.data.data.map((x) => x.camperId),
      )

      campers.load(camperIds)
    } else if (
      routerContext.previousRoute &&
      routerContext.previousRoute.name === page.registrationEventEditPage
    ) {
      const eventIds = _.uniq(
        objectsContext.registrations.data.data.map((x) => x.eventId),
      )

      events.load(eventIds)
    }
  }, [routerContext.previousRoute]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteRegistrationClick = async (registrationId) => {
    const response = await actions.deleteRegistration(registrationId)

    if (response) {
      objectsContext.registrations.load()
    }
  }

  const registrations = objectsContext.registrations.results

  return (
    <React.Fragment>
      <Global
        styles={css`
          html {
            min-width: 1300px;
          }
        `}
      />

      <MainContent>
        <Card>
          <PageHeader
            actions={
              registrations && registrations.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.registrationAddPage)
                      }
                    >
                      Add Registration
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'visitors', breadcrumbName: 'Visitors'},
              {path: 'visitors.registrations', breadcrumbName: 'Registrations'},
            ]}
            title="Registrations"
          />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.registrations.loading,
              tip: 'Loading registrations...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.registrations.load}
              hasError={errorWrapper.hasError}
            >
              <RegistrationsTable
                campers={campers}
                deleteRegistration={handleDeleteRegistrationClick}
                events={events}
                registrations={
                  (registrations &&
                    registrations.map((registration) => {
                      const camper =
                        campers.results &&
                        campers.results.filter(
                          (x) => x.id === registration.camperId,
                        )[0]
                      const event =
                        events.results &&
                        events.results.filter(
                          (x) => x.id === registration.eventId,
                        )[0]

                      return {
                        ...registration,
                        key: registration.id,
                        status:
                          (camper && camper.isDeleted) ||
                          (event && event.isDeleted)
                            ? 'inactive'
                            : 'active',
                      }
                    })) ||
                  []
                }
                onCreateRegistration={() =>
                  routerContext.router.navigate(page.registrationAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isRegistrationAddOrEditPage && (
        <RegistrationView
          id={
            (routerContext.route.params &&
              routerContext.route.params.registrationId) ||
            null
          }
          onSubmit={loadRegistrations}
        />
      )}
    </React.Fragment>
  )
}

export default Registrations
