import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import CounselorViewWrapper from './CounselorViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import {counselorActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, ValuesContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const CounselorView = props => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const valuesContext = useContext(ValuesContext)
  const counselor = useAsyncLoad(actions.loadCounselor, props.id)

  const [fields, setFields] = useState({
    firstName: {includePercent: true, isRequired: true, value: null},
    lastName: {includePercent: true, isRequired: true, value: null},
    startingBalance: {value: 0},
    userId: {includePercent: true, isRequired: true, value: null},
    isActive: {value: true},
  })

  const getCounselor = async () => {
    try {
      const response = await counselor.load()

      if (response) {
        setFields(stateFields =>
          mergeFormData(stateFields, {
            ...response.data,
            userId: `${response.data.userId}`,
          }),
        )
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    objectsContext.users.load()

    if (valuesContext.counselorValues && valuesContext.counselorValues.valid) {
      counselor.stopLoading()

      setFields(valuesContext.counselorValues.fields)
      valuesContext.setCounselorValues(undefined)
    } else if (props.id) {
      getCounselor()
    } else {
      counselor.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.counselors.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      counselor.startLoading()

      const response = await actions.saveCounselor(fields)

      counselor.stopLoading()

      if (response) {
        refreshTable()

        routerContext.router.navigate(page.counselorEditPage, {
          counselorId: response.data.id,
        })
      }
    }
  }

  const handleDeleteCounselorClick = async () => {
    counselor.startLoading()

    const response = await actions.deleteCounselor(props.id)

    counselor.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.counselorsPage)
    }
  }

  const handleCreateNewAccount = adding => {
    valuesContext.setCounselorValues({
      fields,
      valid: false,
      adding,
    })

    routerContext.router.navigate(page.counselorUserAddPage)
  }

  const submitButtonDisabled =
    counselor.loading ||
    objectsContext.users.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <>
      <DrawerView
        fields={fields}
        parentRoute={page.counselorsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Counselor - ${
                counselor.results ? counselor.results.firstName : ''
              }`
            : 'Add a New Counselor'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: counselor.loading || objectsContext.users.loading,
            tip: 'Loading counselor...',
          }}
        >
          <ErrorWrapper
            handleRetry={getCounselor}
            hasError={errorWrapper.hasError}
          >
            <CounselorViewWrapper
              fields={fields}
              usersList={objectsContext.users.results || []}
              onCreateNewAccount={handleCreateNewAccount}
              onDeleteCounselor={handleDeleteCounselorClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </>
  )
}

CounselorView.defaultProps = {
  id: null,
}

CounselorView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CounselorView
