import React, {useState} from 'react'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import ForgotPasswordContent from './components/ForgotPasswordContent'

const ForgotPassword = () => {
  const [fields, setFields] = useState({
    email: {isRequired: true, value: ''},
  })
  const [loading, setLoading] = useState(false)

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)
      await actions.forgotPassword(fields)
      setFields({email: {isRequired: true, value: ''}})
      setLoading(false)
    }
  }

  return (
    <SigninLayout title="Candee Camp">
      <ForgotPasswordContent
        fields={fields}
        loading={loading}
        validForm={isFormReady(fields)}
        onFieldChange={handleFieldChange}
        onSubmit={handleFormSubmit}
      />
    </SigninLayout>
  )
}

export default ForgotPassword
