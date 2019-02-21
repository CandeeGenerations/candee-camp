import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as routeActions, createRouteNodeSelector} from 'redux-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import {LoaderContext} from '../../components/Structure/Loader'
import ResetPasswordContent from './components/ResetPasswordContent'

type Props = {
  route: {
    params: {
      token?: string,
    },
  },

  // functions
  navigateTo: (route: string) => void,
  resetPassword: (fields: {}) => void,
  validateResetPasswordToken: (token: string) => void,
}

const ResetPassword = (props: Props) => {
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
      const response = await props.validateResetPasswordToken(
        props.route.params.token,
      )

      if (!response || !response.data) {
        setTimeout(() => {
          setLoading(stateLoading => ({
            ...stateLoading,
            resetPasswordValidate: false,
          }))
        }, 1000)
      } else {
        props.navigateTo('signin')
      }
    } catch (error) {
      props.navigateTo('signin')
    }
  })

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(stateLoading => ({...stateLoading, resetPassword: true}))
      await props.resetPassword(fields)
      setLoading(stateLoading => ({...stateLoading, resetPassword: false}))
      props.navigateTo('signin')
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

const mapStateToProps = state => ({
  ...createRouteNodeSelector('resetPassword')(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: routeActions.navigateTo,
      resetPassword: actions.resetPassword,
      validateResetPasswordToken: actions.validateResetPasswordToken,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword)
