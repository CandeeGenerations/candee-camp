/** @jsx jsx */
import {css, jsx, Global} from '@emotion/core'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import React, {useEffect} from 'react'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {snackShopPurchaseActions as actions, camperActions} from '@/actions'

import MainContent from '@/components/MainContent'
import {PageHeader} from '@/components/Structure'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const SnackShop = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()

  const camperId =
    (routerContext.route.params && routerContext.route.params.camperId) || null

  const camper = useAsyncLoad(camperActions.loadCamper, camperId)
  const snackShopPurchases = useAsyncLoad(actions.loadSnackShopPurchases, {
    camperId,
    source: 1,
  })

  useTitle(
    `Snack Shop${camper.results ? ` - ${camper.results.firstName}` : ''}`,
  )

  const getCamper = async () => {
    await camper.load()
  }

  useEffect(() => {
    try {
      getCamper()
      snackShopPurchases.load()
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
            actions={[
              <Button
                key="add"
                type="primary"
                onClick={() =>
                  routerContext.router.navigate(page.snackShopCamperAddPage)
                }
              >
                Purchase Item
              </Button>,
            ]}
            routes={[
              {path: '/visitors', breadcrumbName: 'Visitors'},
              {path: '/campers', breadcrumbName: 'Campers'},
              {
                path: `/edit/${camperId}`,
                breadcrumbName: camper.results ? camper.results.firstName : '',
              },
              {path: '/snack-shop', breadcrumbName: 'Snack Shop'},
            ]}
            title={`Snack Shop${
              camper.results ? ` - ${camper.results.firstName}` : ''
            }`}
          />

          <LoaderContext.Provider
            value={{
              spinning: camper.loading,
              tip: "Loading camper's snack shop...",
            }}
          >
            <ErrorWrapper
              handleRetry={camper.load}
              hasError={errorWrapper.hasError}
            >
              Snack Shop for Camper
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </>
  )
}

export default SnackShop
