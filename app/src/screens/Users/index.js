import React, {useContext, useEffect} from 'react'
import {useRoute} from 'react-router5'
import {Button, Card} from 'antd'

import UsersTable from './components/UsersTable'

import {userActions as actions} from '@/actions'

import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Users = () => {
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

  const handleDeleteUserClick = async userId => {
    const response = await actions.deleteUser(userId)

    if (response) {
      objectsContext.users.load()
    }
  }

  return (
    <>
      <section className="cc--main-content">
        <Card>
          <PageHeader
            actions={[
              <Button
                key="add"
                type="primary"
                onClick={() => routerContext.router.navigate('users.add')}
              >
                Add User
              </Button>,
            ]}
            routes={[
              {path: '/dashboard', breadcrumbName: 'Dashboard'},
              {path: '/users', breadcrumbName: 'Users'},
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
                    objectsContext.users.results.map(user => ({
                      ...user,
                      key: user.id,
                    }))) ||
                  []
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </section>
    </>
  )
}

export default Users
