import React, {useEffect} from 'react'
import {useRoute} from 'react-router5'
import {Button, Card} from 'antd'

import {userActions as actions} from '../../actions'

import useTitle from '../../helpers/hooks/useTitle'
import useAsyncLoad from '../../helpers/hooks/useAsyncLoad'

import PageHeader from '../../components/Structure/PageHeader'
import {LoaderContext} from '../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../components/ErrorBoundary/ErrorWrapper'

import UserView from './components/UserView'
import UsersTable from './components/UsersTable'

const Users = () => {
  useTitle('Users')

  const routerContext = useRoute()
  const errorWrapper = useError()
  const users = useAsyncLoad(actions.loadUsers)

  useEffect(() => {
    try {
      users.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, [])

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
            value={{spinning: users.loading, tip: 'Loading users...'}}
          >
            <ErrorWrapper
              handleRetry={users.load}
              hasError={errorWrapper.hasError}
            >
              <UsersTable
                users={
                  users.data
                    ? users.data.data.map(user => ({...user, key: user.id}))
                    : []
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </section>

      {(routerContext.route.name === 'users.edit' ||
        routerContext.route.name === 'users.add') && (
        <UserView
          id={
            (routerContext.route.params && routerContext.route.params.userId) ||
            null
          }
        />
      )}
    </>
  )
}

export default Users
