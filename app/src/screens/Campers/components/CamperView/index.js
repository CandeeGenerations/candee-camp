/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import {Card, Button, Popconfirm, Icon} from 'antd'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import CamperViewWrapper from './CamperViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import {camperActions as actions} from '@/actions'
import {isFormReady, mergeFormData} from '@/helpers'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import MainContent from '@/components/MainContent'
import {PageHeader} from '@/components/Structure'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, ValuesContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const CamperView = props => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const valuesContext = useContext(ValuesContext)
  const [customFieldsState, setCustomFieldsState] = useState([])
  const camper = useAsyncLoad(actions.loadCamper, props.id)

  const [fields, setFields] = useState({
    firstName: {includePercent: true, isRequired: true, value: null},
    lastName: {includePercent: true, isRequired: true, value: null},
    birthDate: {value: null},
    parentFirstName: {value: null},
    parentLastName: {value: null},
    medicine: {value: []},
    allergies: {value: []},
    startingBalance: {value: 0},
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
        setCustomFieldsState(response.data.customFields)
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    objectsContext.coupons.load()
    objectsContext.customFields.load()

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

  const handleCustomFieldsUpdate = customField =>
    setCustomFieldsState(state => [
      ...state.filter(x => x.customFieldId !== customField.customFieldId),
      customField,
    ])

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      camper.startLoading()

      const response = await actions.saveCamper(fields, customFieldsState)

      camper.stopLoading()

      if (response) {
        refreshTable()
      }
    }
  }

  const handleDeleteCamperClick = async () => {
    camper.startLoading()

    const response = await actions.deleteCamper(props.id)

    camper.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(
        page.isRegistrationCamperEditPage
          ? page.registrationsPage
          : page.campersPage,
      )
    }
  }

  const handleFormClose = () =>
    routerContext.router.navigate(
      routerContext.previousRoute?.name || page.campersPage,
    )

  const handleCreateNewCoupon = adding => {
    valuesContext.setCamperValues({
      fields,
      valid: false,
      adding,
    })

    routerContext.router.navigate(page.camperCouponAddPage)
  }

  const loading = camper.loading || objectsContext.coupons.loading

  const submitButtonDisabled = camper.loading || objectsContext.coupons.loading

  return (
    <>
      <MainContent>
        <Card>
          <PageHeader
            routes={[
              {path: 'visitors', breadcrumbName: 'Visitors'},
              {path: 'visitors.campers', breadcrumbName: 'Campers'},
              {
                path: `visitors.campers.${fields.id ? 'edit' : 'add'}`,
                params: fields.id ? {camperId: props.id} : {},
                breadcrumbName: loading
                  ? '...'
                  : fields.id
                  ? camper.results
                    ? camper.results.firstName
                    : fields.firstName.value
                  : 'New Camper',
              },
            ]}
            title={
              loading
                ? 'Loading...'
                : fields.id
                ? `Edit Camper - ${
                    camper.results
                      ? camper.results.firstName
                      : fields.firstName.value
                  }`
                : 'Add a New Camper'
            }
          />
          <LoaderContext.Provider
            value={{
              spinning: loading,
              tip: 'Loading camper...',
            }}
          >
            <ErrorWrapper
              handleRetry={getCamper}
              hasError={errorWrapper.hasError}
            >
              <CamperViewWrapper
                camperCustomFields={customFieldsState}
                couponsList={objectsContext.coupons.results || []}
                customFields={objectsContext.customFields.results || []}
                fields={fields}
                onCreateNewCoupon={handleCreateNewCoupon}
                onCustomFieldsUpdate={handleCustomFieldsUpdate}
                onFieldChange={handleFieldChange}
              />

              <Button
                css={{float: 'left', marginRight: 8}}
                onClick={() =>
                  routerContext.router.navigate(page.camperSnackShopPage, {
                    camperId: props.id,
                  })
                }
              >
                Snack Shop
              </Button>

              <Popconfirm
                cancelText="Cancel"
                icon={<Icon css={{color: 'red'}} type="question-circle-o" />}
                okText="Delete"
                okType="danger"
                placement="topRight"
                title={
                  <p>
                    Are you sure you want
                    <br />
                    to delete this camper?
                  </p>
                }
                onConfirm={handleDeleteCamperClick}
              >
                <Button css={{float: 'left'}} type="danger">
                  Delete Camper
                </Button>
              </Popconfirm>

              <div css={{textAlign: 'right'}}>
                <Button css={{marginRight: 8}} onClick={handleFormClose}>
                  Cancel
                </Button>

                <Button
                  disabled={submitButtonDisabled}
                  type="primary"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </div>
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
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
