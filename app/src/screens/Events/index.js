import React, {useContext, useEffect} from 'react'
import _ from 'lodash'
import {Card, Button} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {eventActions as actions, userActions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import EventsTable from './components/EventsTable'
import EventFilters from './components/EventFilters'

const Events = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const users = useAsyncLoad(userActions.loadUsersByIds)

  useTitle('Events')

  const loadEvents = async (filters = null) => {
    try {
      const response = await objectsContext.events.load(false, filters)

      if (response.data && response.data.length > 0) {
        const userIds = _.uniq(response.data.map((x) => x.createdBy))

        users.load(false, userIds)
      }
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadEvents()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      routerContext.previousRoute &&
      routerContext.previousRoute.name === page.eventUserEditPage
    ) {
      const userIds = _.uniq(
        objectsContext.events.data.data.map((x) => x.createdBy),
      )

      users.load(false, userIds)
    }
  }, [routerContext.previousRoute]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteEvent = async (eventId) => {
    const response = await actions.deleteEvent(eventId)

    if (response) {
      loadEvents()
    }

    return response
  }

  const events = objectsContext.events.results

  return (
    <React.Fragment>
      <Global
        styles={css`
          html {
            min-width: 830px;
          }
        `}
      />

      <MainContent>
        <Card>
          <PageHeader
            actions={
              events && events.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.eventAddPage)
                      }
                    >
                      Add Event
                    </Button>,
                  ]
                : []
            }
            title="Events"
          />

          <EventFilters
            onApplyFilters={(filters) =>
              loadEvents({
                name: filters.name,
                costStart: filters.costStart,
                costEnd: filters.costEnd,
                onGoing:
                  filters.onGoing === 'all' ? null : filters.onGoing === 'true',
                dateStart:
                  (filters.dates.length > 0 &&
                    filters.dates[0].startOf('day').format()) ||
                  null,
                dateEnd:
                  (filters.dates.length > 0 &&
                    filters.dates[1].endOf('day').format()) ||
                  null,
              })
            }
          />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.events.loading,
              tip: 'Loading events...',
            }}
          >
            <ErrorWrapper
              handleRetry={loadEvents}
              hasError={errorWrapper.hasError}
            >
              <EventsTable
                deleteEvent={handleDeleteEvent}
                events={
                  (events &&
                    events.map((event) => ({
                      ...event,
                      key: event.id,
                    }))) ||
                  []
                }
                users={users}
                onCreateEvent={() =>
                  routerContext.router.navigate(page.eventAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </React.Fragment>
  )
}

export default Events
