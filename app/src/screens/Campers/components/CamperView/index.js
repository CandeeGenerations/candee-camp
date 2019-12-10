import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import CamperViewWrapper from './CamperViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import {camperActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import {ObjectsContext, ValuesContext} from '@/screens/App'
import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const CamperView = props => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const valuesContext = useContext(ValuesContext)
  const camper = useAsyncLoad(actions.loadCamper, props.id)

  const [fields, setFields] = useState({
    firstName: {includePercent: true, isRequired: true, value: null},
    lastName: {includePercent: true, isRequired: true, value: null},
    birthDate: {value: null},
    parentFirstName: {value: null},
    parentLastName: {value: null},
    medicine: {value: []},
    allergies: {value: []},
    couponId: {value: undefined},
    isActive: {value: true},
  })

  const getCamper = async () => {
    try {
      const response = await camper.load()

      if (response) {
        setFields(stateFields =>
          mergeFormData(stateFields, {
            ...response.data,
            birthDate: response.data.birthDate
              ? moment(response.data.birthDate)
              : null,
            medicine: response.data.medicine
              ? response.data.medicine.split(',')
              : [],
            allergies: response.data.allergies
              ? response.data.allergies.split(',')
              : [],
            couponId: response.data.couponId
              ? `${response.data.couponId}`
              : undefined,
          }),
        )
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    objectsContext.coupons.load()

    if (valuesContext.camperValues && valuesContext.camperValues.valid) {
      camper.stopLoading()

      setFields(valuesContext.camperValues.fields)
      valuesContext.setCamperValues(undefined)
    } else if (props.id) {
      getCamper()
    } else {
      camper.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.campers.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      camper.startLoading()

      const response = await actions.saveCamper(fields)

      camper.stopLoading()

      if (response) {
        refreshTable()

        routerContext.router.navigate(page.camperEditPage, {
          camperId: response.data.id,
        })
      }
    }
  }

  const handleDeleteCamperClick = async () => {
    camper.startLoading()

    const response = await actions.deleteCamper(props.id)

    camper.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.campersPage)
    }
  }

  const handleCreateNewCoupon = adding => {
    valuesContext.setCamperValues({
      fields,
      valid: false,
      adding,
    })

    routerContext.router.navigate(page.camperCouponAddPage)
  }

  const submitButtonDisabled =
    camper.loading ||
    objectsContext.coupons.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <>
      <DrawerView
        fields={fields}
        parentRoute={page.campersPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Camper - ${
                camper.results
                  ? camper.results.firstName
                  : fields.firstName.value
              }`
            : 'Add a New Camper'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: camper.loading || objectsContext.coupons.loading,
            tip: 'Loading camper...',
          }}
        >
          <ErrorWrapper
            handleRetry={getCamper}
            hasError={errorWrapper.hasError}
          >
            <CamperViewWrapper
              couponsList={objectsContext.coupons.results || []}
              fields={fields}
              onCreateNewCoupon={handleCreateNewCoupon}
              onDeleteCamper={handleDeleteCamperClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </>
  )
}

CamperView.defaultProps = {
  id: null,
}

CamperView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CamperView
