import React, {useContext, useState} from 'react'
import {routerContext} from 'react-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import SigninContent from './components/SigninContent'

const Signin = () => {
  const router = useContext(routerContext)
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
      await actions.signin(fields)
      setLoading(false)
      router.navigate('dashboard')
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

export default Signin
