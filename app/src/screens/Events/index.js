import React, {useContext, useEffect, useState} from 'react'
import {Card} from 'antd'
import {routeContext} from 'react-router5'

import {eventActions as actions} from '../../actions'
import {LoaderContext} from '../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../components/ErrorBoundary/ErrorWrapper'

import EventView from './components/EventView'
import EventsTable from './components/EventsTable'

const Events = () => {
  const router = useContext(routeContext)
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

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <section className="cc--main-content">
        <Card title="Events">
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

      {(router.route.name === 'events.edit' ||
        router.route.name === 'events.add') && (
        <EventView
          id={(router.route.params && router.route.params.eventId) || null}
        />
      )}
    </>
  )
}

export default Events
