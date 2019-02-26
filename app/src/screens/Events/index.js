import React, {useEffect, useState} from 'react'
import {Card, Divider, Button} from 'antd'
import {useRoute} from 'react-router5'

import {eventActions as actions} from '../../actions'
import {useTitle} from '../../helpers/hooks/useTitle'
import {LoaderContext} from '../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../components/ErrorBoundary/ErrorWrapper'

import EventView from './components/EventView'
import EventsTable from './components/EventsTable'

const Events = () => {
  const routerContext = useRoute()
  const errorWrapper = useError()
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    try {
      const response = await actions.loadEvents()

      setLoading(false)
      setEvents(response.data)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useTitle('Events')

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <section className="cc--main-content">
        <Card>
          <Divider orientation="left">Events</Divider>

          <Button
            type="primary"
            onClick={() => routerContext.router.navigate('events.add')}
          >
            Add Event
          </Button>

          <LoaderContext.Provider
            value={{spinning: loading, tip: 'Loading events...'}}
          >
            <ErrorWrapper
              handleRetry={getEvents}
              hasError={errorWrapper.hasError}
            >
              <EventsTable
                events={events.map(event => ({...event, key: event.id}))}
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
