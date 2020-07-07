import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import usePage from '@/helpers/hooks/usePage'
import {cabinActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, ValuesContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CabinViewWrapper from './CabinViewWrapper'

const CabinView = (props) => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const valuesContext = useContext(ValuesContext)
  const cabin = useAsyncLoad(actions.loadCabin, props.id)

  const [fields, setFields] = useState({
    name: {includePercent: true, isRequired: true, value: null},
    isActive: {value: true},
  })

  const getCabin = async () => {
    try {
      const response = await cabin.load()

      if (response) {
        setFields((stateFields) => mergeFormData(stateFields, response.data))
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getCabin()
    } else {
      cabin.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.cabins.load()

  const navigateToCounselor = (cabinId) => {
    const updates = {valid: true}

    if (cabinId) {
      updates.fields = {
        ...valuesContext.counselorValues.fields,
        cabinId: {
          ...valuesContext.counselorValues.fields.cabinId,
          value: `${cabinId}`,
        },
      }
    }

    valuesContext.setCounselorValues({
      ...valuesContext.counselorValues,
      ...updates,
    })

    routerContext.router.navigate(
      valuesContext.counselorValues.adding
        ? page.counselorAddPage
        : page.counselorEditPage,
      valuesContext.counselorValues.adding
        ? {}
        : {counselorId: valuesContext.counselorValues.fields.id.value},
    )
  }

  const handleFormClose = () => {
    if (page.isCounselorCabinAddPage) {
      navigateToCounselor()
    } else {
      routerContext.router.navigate(page.cabinsPage)
    }
  }

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      cabin.startLoading()

      const response = await actions.saveCabin(fields)

      cabin.stopLoading()

      if (response) {
        refreshTable()

        if (page.isCounselorCabinAddPage) {
          navigateToCounselor(response.data.id)
        } else {
          routerContext.router.navigate(page.cabinEditPage, {
            cabinId: response.data.id,
          })
        }
      }
    }
  }

  const handleDeleteCabinClick = async () => {
    cabin.startLoading()

    const response = await actions.deleteCabin(props.id)

    cabin.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.cabinsPage)
    }
  }

  const submitButtonDisabled =
    cabin.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <>
      <DrawerView
        fields={fields}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Cabin - ${cabin.results ? cabin.results.name : ''}`
            : 'Add a New Cabin'
        }
        width={512}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: cabin.loading,
            tip: 'Loading cabin...',
          }}
        >
          <ErrorWrapper handleRetry={getCabin} hasError={errorWrapper.hasError}>
            <CabinViewWrapper
              fields={fields}
              onDeleteCabin={handleDeleteCabinClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </>
  )
}

CabinView.defaultProps = {
  id: null,
}

CabinView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CabinView
