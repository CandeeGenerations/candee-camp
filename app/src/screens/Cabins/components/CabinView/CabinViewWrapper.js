import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import CabinForm from './CabinForm'

const CabinViewWrapper = (props) => {
  return props.loader.spinning ? null : (
    <React.Fragment>
      <p>
        {props.fields.id ? 'Edit this cabin here.' : 'Add a new cabin here.'}
      </p>

      <CabinForm
        {...props.fields}
        onChange={props.onFieldChange}
        onDeleteCabin={props.onDeleteCabin}
      />
    </React.Fragment>
  )
}

CabinViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteCabin: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CabinViewWrapper)
