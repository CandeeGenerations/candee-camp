import React, {useState} from 'react'
import {useRoute} from 'react-router5'

import SigninContent from './components/SigninContent'

import {isFormReady} from '@/helpers'
import useTitle from '@/helpers/hooks/useTitle'
import {signinActions as actions} from '@/actions'

import {SigninLayout} from '@/components/Structure'

const Signin = () => {
  const routerContext = useRoute()
  const [fields, setFields] = useState({
    email: {includePercent: true, isRequired: true, value: ''},
    password: {includePercent: true, isRequired: true, value: ''},
  })
  const [loading, setLoading] = useState(false)

  useTitle('Sign In')

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)
      await actions.signin(fields)
      setLoading(false)

      routerContext.router.navigate(
        routerContext.route.name === 'signin'
          ? 'dashboard'
          : routerContext.route.name,
        routerContext.route.params,
      )
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
