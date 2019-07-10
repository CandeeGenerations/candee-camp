import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'

import {userActions as actions} from '../../../../actions'
import useAsyncLoad from '../../../../helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '../../../../helpers'

import DrawerView from '../../../../components/Structure/DrawerView'
import {LoaderContext} from '../../../../components/Structure/Loader'
import ErrorWrapper, {
  useError,
} from '../../../../components/ErrorBoundary/ErrorWrapper'

import UserViewWrapper from './UserViewWrapper'

const UserView = props => {
  const router = useRouter()
  const errorWrapper = useError()
  const user = useAsyncLoad(actions.loadUser, props.id)

  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState({
    emailAddress: {includePercent: true, isRequired: true, value: null},
    firstName: {includePercent: true, isRequired: true, value: null},
    lastName: {includePercent: true, isRequired: true, value: null},
    role: {includePercent: true, isRequired: true, value: 3},
    username: {includePercent: true, isRequired: true, value: null},
  })

  const getUser = useCallback(async () => {
    try {
      const response = await user.load()

      setFields(stateFields => mergeFormData(stateFields, response.data))
    } catch {
      errorWrapper.handleCatchError()
    }
  }, [errorWrapper, user])

  useEffect(() => {
    if (props.id) {
      getUser()
    }
  }, [props.id, getUser])

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)

      const response = await actions.saveUser(fields)

      setLoading(false)
      router.navigate('users.edit', {userId: response.data.id})
    }
  }

  const submitButtonDisabled =
    loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <DrawerView
      fields={fields}
      parentRoute="users"
      submitButtonDisabled={submitButtonDisabled}
      title={
        fields.id
          ? `Edit User - ${user.data ? user.data.data.username : ''}`
          : 'Add a New User'
      }
      width={512}
      onSubmit={handleFormSubmit}
    >
      <LoaderContext.Provider
        value={{spinning: loading, tip: 'Loading user...'}}
      >
        <ErrorWrapper handleRetry={getUser} hasError={errorWrapper.hasError}>
          <UserViewWrapper fields={fields} onFieldChange={handleFieldChange} />
        </ErrorWrapper>
      </LoaderContext.Provider>
    </DrawerView>
  )
}

UserView.defaultProps = {
  id: null,
}

UserView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default UserView
