import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as routeActions} from 'redux-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import SigninContent from './components/SigninContent'

type Props = {
  // functions
  navigateTo: (route: string) => void,
  signin: (fields: {}) => void,
}

const Signin = (props: Props) => {
  const [fields, setFields] = useState({
    email: {isRequired: true, value: ''},
    password: {isRequired: true, value: ''},
  })
  const [loading, setLoading] = useState(false)

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)
      await props.signin(fields)
      setLoading(false)
      props.navigateTo('dashboard')
    }
  }

  return (
    <SigninLayout title="Candee Camp">
      <SigninContent
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
      navigateTo: routeActions.navigateTo,
      signin: actions.signin,
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(Signin)
