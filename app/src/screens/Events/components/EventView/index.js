import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'

import EventViewWrapper from './EventViewWrapper'

import {eventActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'
import {ObjectsContext} from '@/screens/App'

const EventView = props => {
  const router = useRouter()
  const errorWrapper = useError()
  const objectsContext = useContext(ObjectsContext)
  const event = useAsyncLoad(actions.loadEvent, props.id)

  const [loading, setLoading] = useState(false)
  const [eventName, setEventName] = useState('')
  const [fields, setFields] = useState({
    dateTime: {
      includePercent: true,
      isRequired: true,
      value: [
        moment()
          .add(1, 'week')
          .startOf('week')
          .hour(8),
        moment()
          .add(1, 'week')
          .endOf('week')
          .hour(15)
          .add(1, 'minute'),
      ],
    },
    name: {includePercent: true, isRequired: true, value: ''},
  })

  const getEvent = async () => {
    try {
      const response = await event.load()

      setEventName(response.data.name)
      setFields(stateFields =>
        mergeFormData(stateFields, {
          id: response.data.id,
          name: response.data.name,
          dateTime: [
            moment(response.data.startDate),
            moment(response.data.endDate),
          ],
        }),
      )
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
  }, [props.id])

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.events.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)

      const response = await actions.saveEvent(fields)

      setLoading(false)

      if (response) {
        refreshTable()
        router.navigate('events.edit', {eventId: response.data.id})
      }
    }
  }

  const handleDeleteEventClick = async () => {
    setLoading(true)

    const response = await props.onDeleteEvent(props.id)

    setLoading(false)

    if (response) {
      router.navigate('events')
    }
  }

  const submitButtonDisabled =
    loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <DrawerView
      fields={fields}
      parentRoute="events"
      submitButtonDisabled={submitButtonDisabled}
      title={fields.id ? `Edit Event - ${eventName}` : 'Add a New Event'}
      width={512}
      onSubmit={handleFormSubmit}
    >
      <LoaderContext.Provider
        value={{spinning: loading, tip: 'Loading event...'}}
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

  // functions
  onDeleteEvent: PropTypes.func.isRequired,
}

export default EventView
