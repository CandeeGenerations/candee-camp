import React, {useState} from 'react'
import PropTypes from 'prop-types'

import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

const SingleCamperForm = props => {
  const [fields, setFields] = useState({
    firstName: {includePercent: true, isRequired: true, value: null},
    lastName: {includePercent: true, isRequired: true, value: null},
    birthDate: {value: null},
    parentFirstName: {value: null},
    parentLastName: {value: null},
    medicine: {value: []},
    allergies: {value: []},
    startingBalance: {value: 0},
    couponId: {value: undefined},
    isActive: {value: true},
  })

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  return (
    <CamperForm
      {...fields}
      couponsList={props.coupons}
      publicForm
      onChange={handleFieldChange}
    />
  )
}

SingleCamperForm.propTypes = {
  coupons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default SingleCamperForm
