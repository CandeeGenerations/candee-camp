import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {couponActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CouponsTable from './components/CouponsTable'
import CouponFilters from './components/CouponFilters'

const Coupons = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    couponFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Coupons')

  const loadCoupons = () => {
    try {
      objectsContext.coupons.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadCoupons()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCouponClick = async (couponId) => {
    const response = await actions.deleteCoupon(couponId)

    if (response) {
      loadCoupons()
    }
  }

  const coupons = objectsContext.coupons.results

  return (
    <React.Fragment>
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
            actions={
              coupons && coupons.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.couponAddPage)
                      }
                    >
                      Add Coupon
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'camp', breadcrumbName: 'Camp Management'},
              {path: 'camp.coupons', breadcrumbName: 'Coupons'},
            ]}
            title="Coupons"
          />

          <CouponFilters onApplyFilters={loadCoupons} />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.coupons.loading,
              tip: 'Loading coupons...',
            }}
          >
            <ErrorWrapper
              handleRetry={loadCoupons}
              hasError={errorWrapper.hasError}
            >
              <CouponsTable
                coupons={
                  (coupons &&
                    coupons.map((coupon) => ({
                      ...coupon,
                      key: coupon.id,
                    }))) ||
                  []
                }
                deleteCoupon={handleDeleteCouponClick}
                onCreateCoupon={() =>
                  routerContext.router.navigate(page.couponAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </React.Fragment>
  )
}

export default Coupons
