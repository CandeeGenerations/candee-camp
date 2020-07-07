/** @jsx jsx */
import {css, jsx, Global} from '@emotion/core'
import _ from 'lodash'
import {Card, Row, Col} from 'antd'
import {useRoute} from 'react-router5'
import React, {useEffect, useContext} from 'react'

import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {
  snackShopPurchaseActions as actions,
  camperActions,
  counselorActions,
} from '@/actions'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import {PageHeader} from '@/components/Structure'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import PurchasesTable from './components/PurchasesTable'
import RemainingBalance from './components/RemainingBalance'

const SnackShop = () => {
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  const camperId =
    (routerContext.route.params && routerContext.route.params.camperId) || null
  const counselorId =
    (routerContext.route.params && routerContext.route.params.counselorId) ||
    null

  const camper = useAsyncLoad(camperActions.loadCamper, camperId)
  const counselor = useAsyncLoad(counselorActions.loadCounselor, counselorId)
  const snackShopPurchases = useAsyncLoad(actions.loadSnackShopPurchases, {
    camperId,
    counselorId,
    source: camperId ? 'camper' : 'counselor',
  })

  useTitle(
    `Snack Shop${
      camper.results
        ? ` - ${camper.results.firstName}`
        : counselor.results
        ? ` - ${counselor.results.firstName}`
        : ''
    }`,
  )

  const getCamper = async () => {
    await camper.load()
  }

  const getCounselor = async () => {
    await counselor.load()
  }

  useEffect(() => {
    try {
      if (camperId) {
        getCamper()
      } else {
        getCounselor()
      }

      snackShopPurchases.load()
      objectsContext.snackShopItems.load()
    } catch {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 1300px;
          }
        `}
      />

      <MainContent>
        <Card>
          <PageHeader
            routes={[
              {
                path: camperId ? 'visitors' : 'camp',
                breadcrumbName: camperId ? 'Visitors' : 'Camp',
              },
              {
                path: `visitors.${camperId ? 'campers' : 'counselors'}`,
                breadcrumbName: camperId ? 'Campers' : 'Counselors',
              },
              {
                path: `visitors.${camperId ? 'campers' : 'counselors'}.edit`,
                params: camperId ? {camperId} : {counselorId},
                breadcrumbName: camper.results
                  ? camper.results.firstName
                  : counselor.results
                  ? counselor.results.firstName
                  : '...',
              },
              {
                path: `visitors.${
                  camperId ? 'campers' : 'counselors'
                }.edit.snack-shop`,
                params: camperId ? {camperId} : {counselorId},
                breadcrumbName: 'Snack Shop',
              },
            ]}
            title={`Snack Shop${
              camper.results
                ? ` - ${camper.results.firstName}`
                : counselor.results
                ? ` - ${counselor.results.firstName}`
                : ''
            }`}
          />

          <LoaderContext.Provider
            value={{
              spinning:
                (camperId ? camper.loading : counselor.loading) ||
                snackShopPurchases.loading,
              tip: `Loading ${camperId ? 'camper' : 'counselor'}...`,
            }}
          >
            <Row gutter={16}>
              <Col offset={1} span={11}>
                <RemainingBalance
                  startingBalance={
                    camper.results
                      ? camper.results.startingBalance
                      : counselor.results
                      ? counselor.results.startingBalance
                      : 0
                  }
                  totalPurchasePrice={
                    snackShopPurchases.results
                      ? _.sum(
                          snackShopPurchases.results.map(
                            (x) => x.purchasedPrice,
                          ),
                        )
                      : 0
                  }
                />
              </Col>
            </Row>
          </LoaderContext.Provider>
        </Card>

        <Card css={{marginTop: 25}}>
          <LoaderContext.Provider
            value={{
              spinning:
                (camperId ? camper.loading : counselor.loading) ||
                snackShopPurchases.loading ||
                objectsContext.snackShopItems.loading,
              tip: `Loading ${
                camperId ? 'camper' : 'counselor'
              }'s snack shop...`,
            }}
          >
            <ErrorWrapper
              handleRetry={camper.load}
              hasError={errorWrapper.hasError}
            >
              <PurchasesTable
                camperId={Number(camperId)}
                counselorId={Number(counselorId)}
                items={objectsContext.snackShopItems.results || []}
                purchases={snackShopPurchases.results || []}
                refreshTable={snackShopPurchases.load}
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </>
  )
}

export default SnackShop
