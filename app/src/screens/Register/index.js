import React, {useEffect, useState} from 'react'

import RegisterLayout from './components/RegisterLayout'
import RegisterContent from './components/RegisterContent'

import {axiosRequest} from '@/api'
import {signinActions as actions} from '@/actions'

import {getUser} from '@/helpers/authHelpers'
import useTitle from '@/helpers/hooks/useTitle'

import {LoaderContext} from '@/components/Structure/Loader'

export const RegisterContext = React.createContext()

const Register = () => {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  const fieldDeclarations = {
    firstName: {isRequired: true, value: null},
    lastName: {isRequired: true, value: null},
    birthDate: {value: null},
    parentFirstName: {value: null},
    parentLastName: {value: null},
    medicine: {value: []},
    allergies: {value: []},
    startingBalance: {value: 0},
    coupon: {value: null},
    couponId: {value: undefined},
    isActive: {value: true},
  }

  const [fields, setFields] = useState({...fieldDeclarations})
  const [groupFields, setGroupFields] = useState({
    name: {isRequired: true, value: null},
  })
  const [groupCampers, setGroupCampers] = useState([])

  const authorize = async () => {
    await actions.authorizeClient()

    const user = getUser()

    if (user) {
      axiosRequest.defaults.headers.common.Authorization = `Bearer ${user.access_token}`
    }

    setAuthorized(true)
  }

  useTitle('Register for an Event')

  useEffect(() => {
    authorize()
  }, [])

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleGroupFieldChange = changedFields =>
    setGroupFields(stateFields => ({...stateFields, ...changedFields}))

  return (
    <RegisterLayout>
      <RegisterContext.Provider
        value={{
          authorized,
          fields,
          fieldDeclarations,
          handleFieldChange,
          handleGroupFieldChange,
          groupCampers,
          groupFields,
          setGroupCampers,
          setLoading,
        }}
      >
        <LoaderContext.Provider value={{spinning: loading, tip: 'Loading...'}}>
          <RegisterContent />
        </LoaderContext.Provider>
      </RegisterContext.Provider>
    </RegisterLayout>
  )
}

export default Register
