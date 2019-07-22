import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'

import EventViewWrapper from './EventViewWrapper'

import {eventActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const EventView = props => {
  const router = useRouter()
  const errorWrapper = useError()
  const event = useAsyncLoad(actions.loadEvent, props.id)

  const [loading, setLoading] = useState(false)
  const [eventName, setEventName] = useState('')
  const [fields, setFields] = useState({
    endDate: {includePercent: true, isRequired: true, value: null},
    name: {includePercent: true, isRequired: true, value: ''},
    startDate: {includePercent: true, isRequired: true, value: null},
  })

  const getEvent = useCallback(async () => {
    try {
      const response = await event.load()

      setEventName(response.data.name)
      setFields(stateFields => mergeFormData(stateFields, response.data))
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, [errorWrapper, event])

  useEffect(() => {
    if (props.id) {
      getEvent()
    }
  }, [props.id, getEvent])

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)

      const response = await actions.saveEvent(fields)

      setLoading(false)
      router.navigate('events.edit', {eventId: response.data.id})
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
          <EventViewWrapper fields={fields} onFieldChange={handleFieldChange} />
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
