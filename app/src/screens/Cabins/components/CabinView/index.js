import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import CabinViewWrapper from './CabinViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import {cabinActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import {ObjectsContext} from '@/screens/App'
import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const CabinView = props => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const cabin = useAsyncLoad(actions.loadCabin, props.id)

  const [fields, setFields] = useState({
    name: {includePercent: true, isRequired: true, value: null},
    isActive: {value: true},
  })

  const getCabin = async () => {
    try {
      const response = await cabin.load()

      if (response) {
        setFields(stateFields => mergeFormData(stateFields, response.data))
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

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.cabins.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      cabin.startLoading()

      const response = await actions.saveCabin(fields)

      cabin.stopLoading()

      if (response) {
        refreshTable()

        routerContext.router.navigate(page.cabinEditPage, {
          cabinId: response.data.id,
        })
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
        parentRoute={page.cabinsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Cabin - ${cabin.results ? cabin.results.name : ''}`
            : 'Add a New Cabin'
        }
        width={512}
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
