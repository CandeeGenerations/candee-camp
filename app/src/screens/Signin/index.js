import React, {useContext, useState} from 'react'
import {routeContext} from 'react-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import SigninContent from './components/SigninContent'

const Signin = () => {
  const router = useContext(routeContext)
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

      let newRoute = 'dashboard'

      if (router.route.name !== 'signin') {
        newRoute = router.route.name
      } else if (router.route.params.returnUrl) {
        newRoute = router.route.params.returnUrl
      }

      router.router.navigate(newRoute)
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
