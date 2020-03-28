import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import RegisterLayout from './components/RegisterLayout'
import RegisterContent from './components/RegisterContent'

import {axiosRequest} from '@/api'
import {signinActions as actions, settingActions} from '@/actions'

import {getUser} from '@/helpers/authHelpers'
import useTitle from '@/helpers/hooks/useTitle'

import {Constants} from '@/helpers/constants'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {LoaderContext} from '@/components/Structure/Loader'

export const RegisterContext = React.createContext()

const Register = props => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [singleCamper, setSingleCamper] = useState(true)
  const [customFieldsState, setCustomFieldsState] = useState([])
  const payPalClientId = useAsyncLoad(
    settingActions.loadSetting,
    Constants.SettingKeys.PayPalClientId,
  )

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

  useEffect(() => {
    if (authorized) {
      payPalClientId.load()
      props.customFields.load()
    }
  }, [authorized])

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const handleGroupFieldChange = changedFields =>
    setGroupFields(stateFields => ({...stateFields, ...changedFields}))

  const handleCustomFieldsUpdate = customField =>
    setCustomFieldsState(state => [
      ...state.filter(x => x.customFieldId !== customField.customFieldId),
      customField,
    ])

  return (
    <RegisterLayout>
      <RegisterContext.Provider
        value={{
          authorized,
          event,
          fields,
          fieldDeclarations,
          handleFieldChange,
          handleGroupFieldChange,
          groupCampers,
          groupFields,
          payPalClientId: payPalClientId.results,
          setEvent,
          setGroupCampers,
          setLoading,
          setSingleCamper,
          singleCamper,
          customFields: props.customFields,
          camperCustomFields: customFieldsState,
          handleCustomFieldsUpdate,
        }}
      >
        <LoaderContext.Provider value={{spinning: loading, tip: 'Loading...'}}>
          <RegisterContent />
        </LoaderContext.Provider>
      </RegisterContext.Provider>
    </RegisterLayout>
  )
}

Register.propTypes = {
  customFields: PropTypes.shape(),
}

export default Register
