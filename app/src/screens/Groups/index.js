import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'

import {groupActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import GroupView from './components/GroupView'
import GroupsTable from './components/GroupsTable'
import GroupFilters from './components/GroupFilters'

const Groups = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    groupFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Groups')

  const loadGroups = async () => {
    try {
      objectsContext.groups.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadGroups()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteGroupClick = async (groupId) => {
    const response = await actions.deleteGroup(groupId)

    if (response) {
      loadGroups()
    }
  }

  const groups = objectsContext.groups.results

  return (
    <React.Fragment>
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

          <GroupFilters onApplyFilters={loadGroups} />

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
                    groups.map((group) => ({
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
    </React.Fragment>
  )
}

export default Groups
