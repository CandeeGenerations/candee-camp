import React, {useEffect, useState} from 'react'

import {eventActions as actions} from '../../../../actions'
import {isFormReady, mergeFormData} from '../../../../helpers'
import DrawerView from '../../../../components/Structure/DrawerView'
import {LoaderContext} from '../../../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../../../components/ErrorBoundary/ErrorWrapper'

import EventViewWrapper from './EventViewWrapper'
import {useRouter} from 'react-router5'

type Props = {
  id?: number,

  // functions
  getEvent: (
    eventId: number,
  ) => [
    {
      createBy: string,
      createdDate: number,
      endDate: number,
      id: number,
      name: string,
      startDate: number,
    },
  ],
}

const EventView = (props: Props) => {
  const router = useRouter()
  const errorWrapper = useError()
  const [loading, setLoading] = useState(true)
  const [eventName, setEventName] = useState('')
  const [fields, setFields] = useState({
    endDate: {isRequired: true, value: null},
    name: {isRequired: true, value: ''},
    startDate: {isRequired: true, value: null},
  })

  const getEvent = async () => {
    try {
      const response = await actions.loadEvent(props.id)

      setLoading(false)
      setEventName(response.data.name)
      setFields(stateFields => mergeFormData(stateFields, response.data))
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getEvent()
    } else {
      setLoading(false)
    }
  }, [props.id])

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

  const anyTouchedFields = () => {
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const property = fields[key]

        if (property.touched) {
          return true
        }
      }
    }

    return false
  }

  const submitButtonDisabled =
    loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields()) ||
    (anyTouchedFields() && !isFormReady(fields))

  return (
    <DrawerView
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

export default EventView
