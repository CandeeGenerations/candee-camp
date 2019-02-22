import React, {useEffect, useState} from 'react'
import {useRoute} from 'react-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import {LoaderContext} from '../../components/Structure/Loader'
import ResetPasswordContent from './components/ResetPasswordContent'

const ResetPassword = () => {
  const routerContext = useRoute()
  const [fields, setFields] = useState({
    confirmPassword: {isRequired: true, value: ''},
    newPassword: {isRequired: true, value: ''},
  })
  const [loading, setLoading] = useState({
    resetPassword: false,
    resetPasswordValidate: true,
  })

  useEffect(async () => {
    try {
      const response = await actions.validateResetPasswordToken(
        routerContext.route.params.token,
      )

      if (!response || !response.data) {
        setTimeout(() => {
          setLoading(stateLoading => ({
            ...stateLoading,
            resetPasswordValidate: false,
          }))
        }, 1000)
      } else {
        routerContext.router.navigate('signin')
      }
    } catch (error) {
      routerContext.router.navigate('signin')
    }
  })

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(stateLoading => ({...stateLoading, resetPassword: true}))
      await actions.resetPassword(fields)
      setLoading(stateLoading => ({...stateLoading, resetPassword: false}))
      routerContext.router.navigate('signin')
    }
  }

  return (
    <SigninLayout title="Candee Camp">
      <LoaderContext.Provider
        value={{
          spinning: loading.resetPasswordValidate,
          tip: 'Validating token...',
        }}
      >
        <ResetPasswordContent
          fields={fields}
          loading={loading.resetPassword}
          validForm={isFormReady(fields)}
          onFieldChange={handleFieldChange}
          onSubmit={handleFormSubmit}
        />
      </LoaderContext.Provider>
    </SigninLayout>
  )
}

export default ResetPassword
