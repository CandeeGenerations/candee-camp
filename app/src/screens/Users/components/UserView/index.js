import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import UserViewWrapper from './UserViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import useModal from '@/helpers/hooks/useModal'
import {userActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import {ObjectsContext} from '@/screens/App'
import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import ResetPasswordForm from '@/screens/ResetPassword/components/ResetPasswordForm'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const UserView = props => {
  const passwordFieldsInitialState = {
    confirmPassword: {includePercent: true, isRequired: true, value: ''},
    newPassword: {includePercent: true, isRequired: true, value: ''},
  }
  const fieldsInitialState = {
    emailAddress: {includePercent: true, isRequired: true, value: null},
    firstName: {includePercent: true, isRequired: true, value: null},
    lastName: {includePercent: true, isRequired: true, value: null},
    isActive: {value: true},
  }

  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const user = useAsyncLoad(actions.loadUser, props.id)

  const [fields, setFields] = useState(
    props.id
      ? fieldsInitialState
      : {...fieldsInitialState, ...passwordFieldsInitialState},
  )
  const [passwordFields, setPasswordFields] = useState(
    passwordFieldsInitialState,
  )

  const getUser = async () => {
    try {
      const response = await user.load()

      if (response) {
        setFields(stateFields => mergeFormData(stateFields, response.data))
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    if (props.id) {
      getUser()
    } else {
      user.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const refreshTable = () =>
    objectsContext[
      page.isUserAddOrEditPage ? page.usersPage : page.eventsPage
    ].load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      user.startLoading()

      const response = await actions.saveUser(fields)

      user.stopLoading()

      if (response) {
        refreshTable()

        if (page.isEventUserEditPage) {
          routerContext.router.navigate(page.eventsPage)
        } else {
          routerContext.router.navigate(page.userEditPage, {
            userId: response.data.id,
          })
        }
      }
    }
  }

  const handleChangePassword = () =>
    actions.changeUserPassword(props.id, passwordFields.newPassword.value)

  const handleDeleteUserClick = async () => {
    user.startLoading()

    const response = await actions.deleteUser(props.id)

    user.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(
        page.isUserEditPage ? page.usersPage : page.eventsPage,
      )
    }
  }

  const validPasswordForm = isFormReady(passwordFields)
  const changePasswordModal = useModal({
    callback: () => setPasswordFields(passwordFieldsInitialState),
    content: (
      <ResetPasswordForm
        {...passwordFields}
        valid={validPasswordForm}
        onChange={changedFields =>
          setPasswordFields(stateFields => ({...stateFields, ...changedFields}))
        }
        onSubmit={async () => {
          changePasswordModal.startLoading()
          const result = await handleChangePassword()
          changePasswordModal.stopLoading()

          if (result) {
            changePasswordModal.hide()
          }
        }}
      />
    ),
    okButtonDisabled: !validPasswordForm,
    onOk: handleChangePassword,
    onCancel: () => setPasswordFields(passwordFieldsInitialState),
    title: 'Change Password',
  })

  const handleChangePasswordClick = () => changePasswordModal.show()

  const submitButtonDisabled =
    user.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <>
      <DrawerView
        fields={fields}
        parentRoute={
          page.isUserAddOrEditPage ? page.usersPage : page.eventsPage
        }
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit User - ${user.results ? user.results.firstName : ''}`
            : 'Add a New User'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{spinning: user.loading, tip: 'Loading user...'}}
        >
          <ErrorWrapper handleRetry={getUser} hasError={errorWrapper.hasError}>
            <UserViewWrapper
              fields={fields}
              onDeleteUser={handleDeleteUserClick}
              onFieldChange={handleFieldChange}
              onPasswordChange={handleChangePasswordClick}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>

      {changePasswordModal.render}
    </>
  )
}

UserView.defaultProps = {
  id: null,
}

UserView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default UserView
