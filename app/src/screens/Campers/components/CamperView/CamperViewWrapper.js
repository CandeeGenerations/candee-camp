import React from 'react'
import PropTypes from 'prop-types'

import CamperForm from './CamperForm'

import loader from '@/components/Structure/Loader'

const CamperViewWrapper = props => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id ? 'Edit this camper here.' : 'Add a new camper here.'}
      </p>

      <CamperForm
        {...props.fields}
        couponsList={props.couponsList}
        onChange={props.onFieldChange}
        onCreateNewCoupon={props.onCreateNewCoupon}
        onDeleteCamper={props.onDeleteCamper}
      />
    </>
  )
}

CamperViewWrapper.propTypes = {
  couponsList: PropTypes.array.isRequired,
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onCreateNewCoupon: PropTypes.func.isRequired,
  onDeleteCamper: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CamperViewWrapper)
