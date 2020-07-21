import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import usePage from '@/helpers/hooks/usePage'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {
  registrationActions as actions,
  eventActions,
  camperActions,
} from '@/actions'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import {ObjectsContext} from '@/screens/App'
import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import RegistrationViewWrapper from './RegistrationViewWrapper'

const RegistrationView = (props) => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const registration = useAsyncLoad(actions.loadRegistration, props.id)
  const events = useAsyncLoad(eventActions.loadEventsForRegistration)
  const campers = useAsyncLoad(camperActions.loadCampersForRegistration)

  const [fields, setFields] = useState({
    eventId: {includePercent: true, isRequired: true, value: undefined},
    camperId: {includePercent: true, isRequired: true, value: undefined},
    checkInDate: {value: null},
    checkOutDate: {value: null},
    startingBalance: {value: 0},
    isActive: {value: true},
  })

  const getRegistration = async () => {
    try {
      const response = await registration.load()

      if (response) {
        setFields((stateFields) =>
          mergeFormData(stateFields, {
            ...response.data,
            eventId: response.data.eventId
              ? `${response.data.eventId}`
              : undefined,
            camperId: response.data.camperId
              ? `${response.data.camperId}`
              : undefined,
            checkInDate: response.data.checkInDate
              ? moment(response.data.checkInDate)
              : null,
            checkOutDate: response.data.checkOutDate
              ? moment(response.data.checkOutDate)
              : null,
          }),
        )

        events.load(false, response.data.eventId ? response.data.eventId : null)
        campers.load(
          false,
          response.data.camperId ? response.data.camperId : null,
        )
      } else {
        events.load()
        campers.load()
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getRegistration()
    } else {
      registration.stopLoading()
      events.load()
      campers.load()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.registrations.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      registration.startLoading()

      const response = await actions.saveRegistration(fields)

      registration.stopLoading()

      if (response) {
        props.onSubmit()

        routerContext.router.navigate(page.registrationEditPage, {
          registrationId: response.data.id,
        })
      }
    }
  }

  const handleDeleteRegistrationClick = async () => {
    registration.startLoading()

    const response = await actions.deleteRegistration(props.id)

    registration.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.registrationsPage)
    }
  }

  const submitButtonDisabled =
    registration.loading ||
    events.loading ||
    campers.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <React.Fragment>
      <DrawerView
        fields={fields}
        parentRoute={page.registrationsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={fields.id ? 'Edit Registration' : 'Add a New Registration'}
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: registration.loading || events.loading || campers.loading,
            tip: 'Loading registration...',
          }}
        >
          <ErrorWrapper
            handleRetry={getRegistration}
            hasError={errorWrapper.hasError}
          >
            <RegistrationViewWrapper
              campersList={campers.results || []}
              eventsList={events.results || []}
              fields={fields}
              onDeleteRegistration={handleDeleteRegistrationClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </React.Fragment>
  )
}

RegistrationView.defaultProps = {
  id: null,
}

RegistrationView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  // functions
  onSubmit: PropTypes.func.isRequired,
}

export default RegistrationView
