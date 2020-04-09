import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import RegisterLayout from './components/RegisterLayout'
import RegisterContent from './components/RegisterContent'

import {axiosRequest} from '@/api'
import {
  signinActions as actions,
  couponActions,
  settingActions,
} from '@/actions'

import {getUser} from '@/helpers/authHelpers'
import useTitle from '@/helpers/hooks/useTitle'

import {Constants} from '@/helpers/constants'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {LoaderContext} from '@/components/Structure/Loader'
import {openNotification} from '@/helpers'

export const RegisterContext = React.createContext()

const Register = (props) => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [eventCost, setEventCost] = useState(0)
  const [authorized, setAuthorized] = useState(false)
  const [groupCampers, setGroupCampers] = useState([])
  const [singleCamper, setSingleCamper] = useState(true)
  const [customFieldsState, setCustomFieldsState] = useState([])
  const [discount, setDiscount] = useState({amount: 0, type: 'Dollar'})
  const payPalClientId = useAsyncLoad(
    settingActions.loadSetting,
    Constants.SettingKeys.PayPalClientId,
  )
  const [groupFields, setGroupFields] = useState({
    name: {isRequired: true, value: null},
  })

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

  const coupon = useAsyncLoad(couponActions.loadCouponByCode)

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

  const handleFieldChange = (changedFields) =>
    setFields((stateFields) => ({...stateFields, ...changedFields}))

  const handleGroupFieldChange = (changedFields) =>
    setGroupFields((stateFields) => ({...stateFields, ...changedFields}))

  const handleCustomFieldsUpdate = (customField) =>
    setCustomFieldsState((state) => [
      ...state.filter((x) => x.customFieldId !== customField.customFieldId),
      customField,
    ])

  const applyCoupon = async (code) => {
    const {data} = await coupon.load(false, code)

    if (data) {
      setDiscount({amount: data.amount, type: data.type})
    } else {
      openNotification(
        'error',
        "This coupon doesn't exist. Please try another one.",
      )
    }
  }

  return (
    <RegisterLayout>
      <RegisterContext.Provider
        value={{
          applyCoupon,
          authorized,
          discount,
          setDiscount,
          eventCost,
          setEventCost,
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
