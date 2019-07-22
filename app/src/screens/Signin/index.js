import React, {useState} from 'react'
import {useRoute} from 'react-router5'
import SimpleCrypto from 'simple-crypto-js'

import SigninContent from './components/SigninContent'

import Config from '@/config'
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

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      setLoading(true)
      await actions.signin(fields)
      setLoading(false)

      let newRoute = 'dashboard'
      let routeParams = {}

      if (routerContext.route.name !== 'signin') {
        newRoute = routerContext.route.name
      } else if (routerContext.route.params.p) {
        const simpleCrypto = new SimpleCrypto(Config.cryptoKey)
        const params = JSON.parse(
          simpleCrypto.decrypt(routerContext.route.params.p),
        )

        newRoute = params.returnUrl
        routeParams = params.returnParams ? JSON.parse(params.returnParams) : {}
      }

      routerContext.router.navigate(newRoute, routeParams)
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
