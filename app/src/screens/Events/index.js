import React, {useContext, useEffect} from 'react'
import _ from 'lodash'
import {Card, Button} from 'antd'
import {useRoute} from 'react-router5'

import {eventActions as actions, userActions} from '../../actions'

import useTitle from '../../helpers/hooks/useTitle'
import useAsyncLoad from '../../helpers/hooks/useAsyncLoad'

import {ObjectsContext} from '../App'
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
  const objectsContext = useContext(ObjectsContext)
  const users = useAsyncLoad(userActions.loadUsersByIds)

  useTitle('Events')

  const loadEvents = async () => {
    try {
      const response = await objectsContext.events.load()
      const userIds = _.uniq(response.data.map(x => x.createdBy))

      users.load(false, userIds)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadEvents()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteEvent = async eventId => {
    const response = await actions.deleteEvent(eventId)

    if (response) {
      loadEvents()
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
                deleteEvent={deleteEvent}
                events={
                  (objectsContext.events.results &&
                    objectsContext.events.results.map(event => ({
                      ...event,
                      key: event.id,
                    }))) ||
                  []
                }
                users={users}
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
