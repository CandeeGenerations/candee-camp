import React, {useEffect, useState} from 'react'

import RegisterLayout from './components/RegisterLayout'
import RegisterContent from './components/RegisterContent'

import {axiosRequest} from '@/api'
import {signinActions as actions} from '@/actions'

import {LoaderContext} from '@/components/Structure/Loader'
import {getUser} from '@/helpers/authHelpers'

export const RegisterContext = React.createContext()

const Register = () => {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  const authorize = async () => {
    await actions.authorizeClient()

    const user = getUser()

    if (user) {
      axiosRequest.defaults.headers.common.Authorization = `Bearer ${user.access_token}`
    }

    setAuthorized(true)
  }

  useEffect(() => {
    authorize()
  }, [])

  return (
    <RegisterLayout>
      <RegisterContext.Provider value={{authorized, setLoading}}>
        <LoaderContext.Provider value={{spinning: loading, tip: 'Loading...'}}>
          <RegisterContent />
        </LoaderContext.Provider>
      </RegisterContext.Provider>
    </RegisterLayout>
  )
}

export default Register
