import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import usePage from '@/helpers/hooks/usePage'
import {snackShopItemActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import SnackShopItemViewWrapper from './SnackShopItemViewWrapper'

const SnackShopItemView = (props) => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    snackShopItemFilters: {transformedFilters},
  } = useContext(FiltersContext)
  const snackShopItem = useAsyncLoad(actions.loadSnackShopItem, props.id)

  const [fields, setFields] = useState({
    name: {includePercent: true, isRequired: true, value: null},
    barcode: {value: null},
    price: {value: 0},
    amountAvailable: {value: 0},
    isActive: {value: true},
  })

  const getSnackShopItem = async () => {
    try {
      const response = await snackShopItem.load()

      if (response) {
        setFields((stateFields) => mergeFormData(stateFields, response.data))
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getSnackShopItem()
    } else {
      snackShopItem.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const refreshTable = () =>
    objectsContext.snackShopItems.load(transformedFilters)

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      snackShopItem.startLoading()

      const response = await actions.saveSnackShopItem(fields)

      snackShopItem.stopLoading()

      if (response) {
        refreshTable()

        routerContext.router.navigate(page.snackShopItemEditPage, {
          snackShopItemId: response.data.id,
        })
      }
    }
  }

  const handleDeleteSnackShopItemClick = async () => {
    snackShopItem.startLoading()

    const response = await actions.deleteSnackShopItem(props.id)

    snackShopItem.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.snackShopItemsPage)
    }
  }

  const submitButtonDisabled =
    snackShopItem.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <React.Fragment>
      <DrawerView
        fields={fields}
        parentRoute={page.snackShopItemsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Snack Shop Item - ${
                snackShopItem.results ? snackShopItem.results.name : ''
              }`
            : 'Add a New Snack Shop Item'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: snackShopItem.loading,
            tip: 'Loading snack shop item...',
          }}
        >
          <ErrorWrapper
            handleRetry={getSnackShopItem}
            hasError={errorWrapper.hasError}
          >
            <SnackShopItemViewWrapper
              fields={fields}
              onDeleteSnackShopItem={handleDeleteSnackShopItemClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </React.Fragment>
  )
}

SnackShopItemView.defaultProps = {
  id: null,
}

SnackShopItemView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default SnackShopItemView
