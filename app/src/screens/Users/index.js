import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {userActions as actions} from '@/actions'
import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import UsersTable from './components/UsersTable'
import UserFilters from './components/UserFilters'

const Users = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    userFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Users')

  const loadUsers = () => {
    try {
      objectsContext.users.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadUsers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteUserClick = async (userId) => {
    const response = await actions.deleteUser(userId)

    if (response) {
      loadUsers()
    }
  }

  return (
    <React.Fragment>
      <Global
        styles={css`
          html {
            min-width: 1090px;
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
                onClick={() => routerContext.router.navigate(page.userAddPage)}
              >
                Add User
              </Button>,
            ]}
            routes={[
              {path: 'camp', breadcrumbName: 'Camp Management'},
              {path: 'camp.users', breadcrumbName: 'Users'},
            ]}
            title="Users"
          />

          <UserFilters onApplyFilters={loadUsers} />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.users.loading,
              tip: 'Loading users...',
            }}
          >
            <ErrorWrapper
              handleRetry={loadUsers}
              hasError={errorWrapper.hasError}
            >
              <UsersTable
                deleteUser={handleDeleteUserClick}
                users={
                  (objectsContext.users.results &&
                    objectsContext.users.results.map((user) => ({
                      ...user,
                      key: user.id,
                    }))) ||
                  []
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </React.Fragment>
  )
}

export default Users
