import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import SnackShopItemView from './components/SnackShopItemView'
import SnackShopItemsTable from './components/SnackShopItemsTable'

import {snackShopItemActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const SnackShopItems = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Snack Shop Items')

  useEffect(() => {
    try {
      objectsContext.snackShopItems.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteSnackShopItemClick = async snackShopItemId => {
    const response = await actions.deleteSnackShopItem(snackShopItemId)

    if (response) {
      objectsContext.snackShopItems.load()
    }
  }

  const snackShopItems = objectsContext.snackShopItems.results

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
            actions={
              snackShopItems && snackShopItems.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.snackShopItemAddPage)
                      }
                    >
                      Add Snack Shop Item
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'camp', breadcrumbName: 'Camp Management'},
              {
                path: 'camp.snackShopItems',
                breadcrumbName: 'Snack Shop Items',
              },
            ]}
            title="Snack Shop Items"
          />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.snackShopItems.loading,
              tip: 'Loading snack shop items...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.snackShopItems.load}
              hasError={errorWrapper.hasError}
            >
              <SnackShopItemsTable
                deleteSnackShopItem={handleDeleteSnackShopItemClick}
                snackShopItems={
                  (snackShopItems &&
                    snackShopItems.map(snackShopItem => ({
                      ...snackShopItem,
                      key: snackShopItem.id,
                    }))) ||
                  []
                }
                onCreateSnackShopItem={() =>
                  routerContext.router.navigate(page.snackShopItemAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isSnackShopItemAddOrEditPage && (
        <SnackShopItemView
          id={
            (routerContext.route.params &&
              routerContext.route.params.snackShopItemId) ||
            null
          }
          onDeleteSnackShopItem={handleDeleteSnackShopItemClick}
        />
      )}
    </>
  )
}

export default SnackShopItems
