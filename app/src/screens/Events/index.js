import React, {useEffect, useState} from 'react'
import {Card} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {startsWithSegment} from 'router5-helpers'
import {createRouteNodeSelector} from 'redux-router5'

import {eventActions as actions} from '../../actions'
import {LoaderContext} from '../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../components/ErrorBoundary/ErrorWrapper'

import EventView from './components/EventView'
import EventsTable from './components/EventsTable'

type Props = {
  route?: {
    name: string,
    params: {
      eventId?: number,
    },
  },

  // functions
  loadEvents: () => void,
}

const Events = (props: Props) => {
  const errorWrapper = useError()
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const testRoute = startsWithSegment(props.route.name)

  const getEvents = async () => {
    try {
      const response = await props.loadEvents()

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

      {(testRoute('events.edit') || testRoute('events.add')) && (
        <EventView
          id={(props.route.params && props.route.params.eventId) || null}
        />
      )}
    </>
  )
}

const mapStateToProps = state => ({
  ...createRouteNodeSelector('event')(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadEvents: actions.loadEvents,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Events)
