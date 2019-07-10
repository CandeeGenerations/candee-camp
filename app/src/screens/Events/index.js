import React, {useEffect} from 'react'
import {Card, Button} from 'antd'
import {useRoute} from 'react-router5'

import {eventActions as actions} from '../../actions'

import useTitle from '../../helpers/hooks/useTitle'
import useAsyncLoad from '../../helpers/hooks/useAsyncLoad'

import PageHeader from '../../components/Structure/PageHeader'
import {LoaderContext} from '../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../components/ErrorBoundary/ErrorWrapper'

import EventView from './components/EventView'
import EventsTable from './components/EventsTable'

const Events = () => {
  const errorWrapper = useError()
  const routerContext = useRoute()
  const events = useAsyncLoad(actions.loadEvents)

  useTitle('Events')

  useEffect(() => {
    try {
      events.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteEvent = async eventId => {
    const response = await actions.deleteEvent(eventId)

    if (response) {
      events.load()
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
                onClick={() => routerContext.router.navigate('events.add')}
              >
                Add Event
              </Button>,
            ]}
            routes={[
              {path: '/dashboard', breadcrumbName: 'Dashboard'},
              {path: '/events', breadcrumbName: 'Events'},
            ]}
            title="Events"
          />

          <LoaderContext.Provider
            value={{spinning: events.loading, tip: 'Loading events...'}}
          >
            <ErrorWrapper
              handleRetry={events.load}
              hasError={errorWrapper.hasError}
            >
              <EventsTable
                deleteEvent={deleteEvent}
                events={
                  events.results &&
                  events.results.map(event => ({...event, key: event.id}))
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </section>

      {(routerContext.route.name === 'events.edit' ||
        routerContext.route.name === 'events.add') && (
        <EventView
          id={
            (routerContext.route.params &&
              routerContext.route.params.eventId) ||
            null
          }
        />
      )}
    </>
  )
}

export default Events
