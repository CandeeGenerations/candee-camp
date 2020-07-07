import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import usePage from '@/helpers/hooks/usePage'
import {eventActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import {ObjectsContext} from '@/screens/App'
import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import EventViewWrapper from './EventViewWrapper'

const EventView = (props) => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const event = useAsyncLoad(actions.loadEvent, props.id)

  const [fields, setFields] = useState({
    cost: {value: 0},
    dateTime: {
      includePercent: true,
      isRequired: true,
      value: [
        moment().add(1, 'week').startOf('week').hour(8),
        moment().add(1, 'week').endOf('week').hour(15).add(1, 'minute'),
      ],
    },
    name: {includePercent: true, isRequired: true, value: ''},
  })

  const getEvent = async () => {
    try {
      const response = await event.load()

      if (response) {
        setFields((stateFields) =>
          mergeFormData(stateFields, {
            ...response.data,
            dateTime: [
              moment(response.data.startDate),
              moment(response.data.endDate),
            ],
          }),
        )
      }
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getEvent()
    } else {
      event.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.events.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      event.startLoading()

      const response = await actions.saveEvent(fields)

      event.stopLoading()

      if (response) {
        refreshTable()

        if (page.isRegistrationEventEditPage) {
          routerContext.router.navigate(page.registrationsPage)
        } else {
          routerContext.router.navigate(page.eventEditPage, {
            eventId: response.data.id,
          })
        }
      }
    }
  }

  const handleDeleteEventClick = async () => {
    event.startLoading()

    const response = await actions.deleteEvent(props.id)

    event.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(
        page.isRegistrationEventEditPage
          ? page.registrationsPage
          : page.eventsPage,
      )
    }
  }

  const handleFormClose = () =>
    routerContext.router.navigate(
      page.isRegistrationEventEditPage
        ? page.registrationsPage
        : page.eventsPage,
    )

  const submitButtonDisabled =
    event.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <DrawerView
      fields={fields}
      submitButtonDisabled={submitButtonDisabled}
      title={
        fields.id
          ? `Edit Event - ${
              event.results ? event.results.name : fields.name.value
            }`
          : 'Add a New Event'
      }
      width={512}
      onClose={handleFormClose}
      onSubmit={handleFormSubmit}
    >
      <LoaderContext.Provider
        value={{spinning: event.loading, tip: 'Loading event...'}}
      >
        <ErrorWrapper handleRetry={getEvent} hasError={errorWrapper.hasError}>
          <EventViewWrapper
            fields={fields}
            onDeleteEvent={handleDeleteEventClick}
            onFieldChange={handleFieldChange}
          />
        </ErrorWrapper>
      </LoaderContext.Provider>
    </DrawerView>
  )
}

EventView.defaultProps = {
  id: null,
}

EventView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default EventView
