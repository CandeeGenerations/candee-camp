import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import CouponForm from './CouponForm'

const CouponViewWrapper = (props) => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id ? 'Edit this coupon here.' : 'Add a new coupon here.'}
      </p>

      <CouponForm
        {...props.fields}
        onChange={props.onFieldChange}
        onDeleteCoupon={props.onDeleteCoupon}
      />
    </>
  )
}

CouponViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteCoupon: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CouponViewWrapper)
