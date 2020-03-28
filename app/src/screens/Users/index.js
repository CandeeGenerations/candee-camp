import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import UsersTable from './components/UsersTable'

import {userActions as actions} from '@/actions'
import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Users = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Users')

  useEffect(() => {
    try {
      objectsContext.users.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteUserClick = async (userId) => {
    const response = await actions.deleteUser(userId)

    if (response) {
      objectsContext.users.load()
    }
  }

  return (
    <>
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

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.users.loading,
              tip: 'Loading users...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.users.load}
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
    </>
  )
}

export default Users
