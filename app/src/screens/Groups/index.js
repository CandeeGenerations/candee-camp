import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
// import {css, Global} from '@emotion/core'

import GroupView from './components/GroupView'
import GroupsTable from './components/GroupsTable'

import {groupActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Groups = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Groups')

  useEffect(() => {
    try {
      objectsContext.groups.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteGroupClick = async groupId => {
    const response = await actions.deleteGroup(groupId)

    if (response) {
      objectsContext.groups.load()
    }
  }

  const groups = objectsContext.groups.results

  return (
    <>
      <MainContent>
        <Card>
          <PageHeader
            actions={
              groups && groups.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.groupAddPage)
                      }
                    >
                      Add Group
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'visitors', breadcrumbName: 'Visitors'},
              {path: 'visitors.groups', breadcrumbName: 'Groups'},
            ]}
            title="Groups"
          />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.groups.loading,
              tip: 'Loading groups...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.groups.load}
              hasError={errorWrapper.hasError}
            >
              <GroupsTable
                deleteGroup={handleDeleteGroupClick}
                groups={
                  (groups &&
                    groups.map(group => ({
                      ...group,
                      key: group.id,
                    }))) ||
                  []
                }
                onCreateGroup={() =>
                  routerContext.router.navigate(page.groupAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isGroupAddOrEditPage && (
        <GroupView
          id={
            (routerContext.route.params &&
              routerContext.route.params.groupId) ||
            null
          }
          onDeleteGroup={handleDeleteGroupClick}
        />
      )}
    </>
  )
}

export default Groups
