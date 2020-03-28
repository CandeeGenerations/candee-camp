import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import CouponViewWrapper from './CouponViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import {couponActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, ValuesContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const CouponView = (props) => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const valuesContext = useContext(ValuesContext)
  const coupon = useAsyncLoad(actions.loadCoupon, props.id)

  const [fields, setFields] = useState({
    name: {includePercent: true, isRequired: true, value: null},
    code: {includePercent: true, isRequired: true, value: null},
    expirationDate: {value: null},
    isActive: {value: true},
  })

  const getCoupon = async () => {
    try {
      const response = await coupon.load()

      if (response) {
        setFields((stateFields) =>
          mergeFormData(stateFields, {
            ...response.data,
            expirationDate: response.data.expirationDate
              ? moment(response.data.expirationDate)
              : null,
          }),
        )
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getCoupon()
    } else {
      coupon.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.coupons.load()

  const navigateToCamper = (couponId) => {
    const updates = {valid: true}

    if (couponId) {
      updates.fields = {
        ...valuesContext.camperValues.fields,
        couponId: {
          ...valuesContext.camperValues.fields.couponId,
          value: `${couponId}`,
        },
      }
    }

    valuesContext.setCamperValues({
      ...valuesContext.camperValues,
      ...updates,
    })

    routerContext.router.navigate(
      valuesContext.camperValues.adding
        ? page.camperAddPage
        : page.camperEditPage,
      valuesContext.camperValues.adding
        ? {}
        : {camperId: valuesContext.camperValues.fields.id.value},
    )
  }

  const handleFormClose = () => {
    if (page.isCamperCouponAddPage) {
      navigateToCamper()
    } else {
      routerContext.router.navigate(page.couponsPage)
    }
  }

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      coupon.startLoading()

      const response = await actions.saveCoupon(fields)

      coupon.stopLoading()

      if (response) {
        refreshTable()

        if (page.isCamperCouponAddPage) {
          navigateToCamper(response.data.id)
        } else {
          routerContext.router.navigate(page.couponEditPage, {
            couponId: response.data.id,
          })
        }
      }
    }
  }

  const handleDeleteCouponClick = async () => {
    coupon.startLoading()

    const response = await actions.deleteCoupon(props.id)

    coupon.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.couponsPage)
    }
  }

  const submitButtonDisabled =
    coupon.loading ||
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
            ? `Edit Coupon - ${coupon.results ? coupon.results.name : ''}`
            : 'Add a New Coupon'
        }
        width={512}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: coupon.loading,
            tip: 'Loading coupon...',
          }}
        >
          <ErrorWrapper
            handleRetry={getCoupon}
            hasError={errorWrapper.hasError}
          >
            <CouponViewWrapper
              fields={fields}
              onDeleteCoupon={handleDeleteCouponClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </>
  )
}

CouponView.defaultProps = {
  id: null,
}

CouponView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CouponView
