import React, {useContext, useEffect} from 'react'
import {Button, Card, Tag} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {customFieldActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CustomFieldView from './components/CustomFieldView'
import CustomFieldsTable from './components/CustomFieldsTable'

const CustomFields = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Custom Fields')

  useEffect(() => {
    try {
      objectsContext.customFields.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCustomFieldClick = async (customFieldId) => {
    const response = await actions.deleteCustomField(customFieldId)

    if (response) {
      objectsContext.customFields.load()
    }
  }

  const handleReorderCustomFields = async (sourceId, targetId) => {
    objectsContext.customFields.startLoading()

    const response = await actions.reorderCustomFields(sourceId, targetId)

    if (response) {
      objectsContext.customFields.load()
    } else {
      objectsContext.customFields.stopLoading()
    }
  }

  const customFields = objectsContext.customFields.results

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
              customFields && customFields.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.customFieldAddPage)
                      }
                    >
                      Add Custom Field
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'camp', breadcrumbName: 'Camp Management'},
              {
                path: 'camp.customFields',
                breadcrumbName: 'Custom Fields',
              },
            ]}
            title="Custom Fields"
          />

          <p>
            <Tag color="blue">Tip!</Tag>You can drag and drop the custom fields
            to reorder them.
          </p>

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.customFields.loading,
              tip: 'Loading custom fields...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.customFields.load}
              hasError={errorWrapper.hasError}
            >
              <CustomFieldsTable
                customFields={
                  (customFields &&
                    customFields.map((customField) => ({
                      ...customField,
                      key: customField.id,
                    }))) ||
                  []
                }
                deleteCustomField={handleDeleteCustomFieldClick}
                onCreateCustomField={() =>
                  routerContext.router.navigate(page.customFieldAddPage)
                }
                onReorderCustomFields={handleReorderCustomFields}
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isCustomFieldAddOrEditPage && (
        <CustomFieldView
          id={
            (routerContext.route.params &&
              routerContext.route.params.customFieldId) ||
            null
          }
          onDeleteCustomField={handleDeleteCustomFieldClick}
        />
      )}
    </React.Fragment>
  )
}

export default CustomFields
