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
        onChange={props.onFieldChange}
        onDeleteCamper={props.onDeleteCamper}
      />
    </>
  )
}

CamperViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteCamper: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CamperViewWrapper)
