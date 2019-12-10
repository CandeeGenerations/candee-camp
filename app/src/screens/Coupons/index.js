import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import CouponsTable from './components/CouponsTable'

import {couponActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Coupons = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Coupons')

  useEffect(() => {
    try {
      objectsContext.coupons.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCouponClick = async couponId => {
    const response = await actions.deleteCoupon(couponId)

    if (response) {
      objectsContext.coupons.load()
    }
  }

  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 1160px;
          }
        `}
      />

      <MainContent>
        <Card>
          <PageHeader
            actions={[
              <Button
                key="add"
                type="primary"
                onClick={() =>
                  routerContext.router.navigate(page.couponAddPage)
                }
              >
                Add Coupon
              </Button>,
            ]}
            routes={[
              {path: '/camp', breadcrumbName: 'Camp Management'},
              {path: '/coupons', breadcrumbName: 'Coupons'},
            ]}
            title="Coupons"
          />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.coupons.loading,
              tip: 'Loading coupons...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.coupons.load}
              hasError={errorWrapper.hasError}
            >
              <CouponsTable
                coupons={
                  (objectsContext.coupons.results &&
                    objectsContext.coupons.results.map(coupon => ({
                      ...coupon,
                      key: coupon.id,
                    }))) ||
                  []
                }
                deleteCoupon={handleDeleteCouponClick}
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </>
  )
}

export default Coupons
