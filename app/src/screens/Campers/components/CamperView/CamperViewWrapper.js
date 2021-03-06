/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import CamperForm from './CamperForm'

const CamperViewWrapper = (props) => {
  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : (
    <React.Fragment>
      <p>
        {props.fields.id ? 'Edit this camper here.' : 'Add a new camper here.'}
      </p>

      <CamperForm
        {...props.fields}
        camperCustomFields={props.camperCustomFields}
        couponsList={props.couponsList}
        customFields={props.customFields}
        onChange={props.onFieldChange}
        onCreateNewCoupon={props.onCreateNewCoupon}
        onCustomFieldsUpdate={props.onCustomFieldsUpdate}
      />
    </React.Fragment>
  )
}

CamperViewWrapper.propTypes = {
  camperCustomFields: PropTypes.array.isRequired,
  couponsList: PropTypes.array.isRequired,
  customFields: PropTypes.array.isRequired,
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onCreateNewCoupon: PropTypes.func.isRequired,
  onCustomFieldsUpdate: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CamperViewWrapper)
