import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import ForgotPasswordContent from './components/ForgotPasswordContent'

type Props = {
  // functions
  forgotPassword: (fields: {}) => void,
}

const ForgotPassword = (props: Props) => {
  const [fields, setFields] = useState({
    email: {isRequired: true, value: ''},
  })
  const [loading, setLoading] = useState(false)

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)
      await props.forgotPassword(fields)
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      forgotPassword: actions.forgotPassword,
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPassword)
