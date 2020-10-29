import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {snackShopItemActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import SnackShopItemView from './components/SnackShopItemView'
import SnackShopItemsTable from './components/SnackShopItemsTable'
import SnackShopItemFilters from './components/SnackShopItemFilters'

const SnackShopItems = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    snackShopItemFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Snack Shop Items')

  const loadSnackShopItems = () => {
    try {
      objectsContext.snackShopItems.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadSnackShopItems()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteSnackShopItemClick = async (snackShopItemId) => {
    const response = await actions.deleteSnackShopItem(snackShopItemId)

    if (response) {
      loadSnackShopItems()
    }
  }

  const snackShopItems = objectsContext.snackShopItems.results

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

          <SnackShopItemFilters onApplyFilters={loadSnackShopItems} />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.snackShopItems.loading,
              tip: 'Loading snack shop items...',
            }}
          >
            <ErrorWrapper
              handleRetry={loadSnackShopItems}
              hasError={errorWrapper.hasError}
            >
              <SnackShopItemsTable
                deleteSnackShopItem={handleDeleteSnackShopItemClick}
                snackShopItems={
                  (snackShopItems &&
                    snackShopItems.map((snackShopItem) => ({
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
    </React.Fragment>
  )
}

export default SnackShopItems
