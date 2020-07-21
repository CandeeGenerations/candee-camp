import React, {useContext, useEffect, useState} from 'react'
import {Button} from 'antd'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import usePage from '@/helpers/hooks/usePage'
import {counselorActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, ValuesContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CounselorViewWrapper from './CounselorViewWrapper'

const CounselorView = (props) => {
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
    cabinId: {value: null},
    isActive: {value: true},
  })

  const getCounselor = async () => {
    try {
      const response = await counselor.load()

      if (response) {
        setFields((stateFields) =>
          mergeFormData(stateFields, {
            ...response.data,
            userId: `${response.data.userId}`,
            cabinId: response.data.cabinId
              ? `${response.data.cabinId}`
              : undefined,
          }),
        )
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    objectsContext.users.load()
    objectsContext.cabins.load()

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

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

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

  const handleCreateNewAccount = (adding) => {
    valuesContext.setCounselorValues({
      fields,
      valid: false,
      adding,
    })

    routerContext.router.navigate(page.counselorUserAddPage)
  }

  const handleCreateNewCabin = (adding) => {
    valuesContext.setCounselorValues({
      fields,
      valid: false,
      adding,
    })

    routerContext.router.navigate(page.counselorCabinAddPage)
  }

  const submitButtonDisabled =
    counselor.loading ||
    objectsContext.users.loading ||
    objectsContext.cabins.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <React.Fragment>
      <DrawerView
        extraButtons={
          props.id && (
            <React.Fragment>
              <Button
                onClick={() =>
                  routerContext.router.navigate(page.counselorSnackShopPage, {
                    counselorId: props.id,
                  })
                }
              >
                Snack Shop
              </Button>
            </React.Fragment>
          )
        }
        fields={fields}
        parentRoute={page.counselorsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Counselor - ${
                counselor.results
                  ? counselor.results.firstName
                  : fields.firstName.value
              }`
            : 'Add a New Counselor'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning:
              counselor.loading ||
              objectsContext.users.loading ||
              objectsContext.cabins.loading,
            tip: 'Loading counselor...',
          }}
        >
          <ErrorWrapper
            handleRetry={getCounselor}
            hasError={errorWrapper.hasError}
          >
            <CounselorViewWrapper
              cabinsList={objectsContext.cabins.results || []}
              fields={fields}
              usersList={objectsContext.users.results || []}
              onCreateNewAccount={handleCreateNewAccount}
              onCreateNewCabin={handleCreateNewCabin}
              onDeleteCounselor={handleDeleteCounselorClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </React.Fragment>
  )
}

CounselorView.defaultProps = {
  id: null,
}

CounselorView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CounselorView
