/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'
import React, {useContext, useEffect, useState} from 'react'

import usePage from '@/helpers/hooks/usePage'
import {customFieldActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import {ObjectsContext} from '@/screens/App'
import {DrawerView} from '@/components/Structure'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CustomFieldViewWrapper from './CustomFieldViewWrapper'

const CustomFieldView = (props) => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const customField = useAsyncLoad(actions.loadCustomField, props.id)

  const [fields, setFields] = useState({
    name: {includePercent: true, isRequired: true, value: null},
    fieldType: {value: 'Text'},
    required: {value: false},
    isActive: {value: true},
  })

  const getCustomField = async () => {
    try {
      const response = await customField.load()

      if (response) {
        setFields((stateFields) => mergeFormData(stateFields, response.data))
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getCustomField()
    } else {
      customField.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.customFields.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      customField.startLoading()

      const response = await actions.saveCustomField(fields)

      customField.stopLoading()

      if (response) {
        refreshTable()

        routerContext.router.navigate(page.customFieldEditPage, {
          customFieldId: response.data.id,
        })
      }
    }
  }

  const handleDeleteCustomFieldClick = async () => {
    customField.startLoading()

    const response = await actions.deleteCustomField(props.id)

    customField.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.customFieldsPage)
    }
  }

  const submitButtonDisabled =
    customField.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <React.Fragment>
      <DrawerView
        fields={fields}
        parentRoute={page.customFieldsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Custom Field - ${
                customField.results ? customField.results.name : ''
              }`
            : 'Add a New Custom Field'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: customField.loading,
            tip: 'Loading custom field...',
          }}
        >
          <ErrorWrapper
            handleRetry={getCustomField}
            hasError={errorWrapper.hasError}
          >
            <CustomFieldViewWrapper
              fields={fields}
              onDeleteCustomField={handleDeleteCustomFieldClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </React.Fragment>
  )
}

CustomFieldView.defaultProps = {
  id: null,
}

CustomFieldView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CustomFieldView
