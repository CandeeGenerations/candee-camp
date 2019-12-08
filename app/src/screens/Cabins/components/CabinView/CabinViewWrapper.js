import React from 'react'
import PropTypes from 'prop-types'

import CabinForm from './CabinForm'

import loader from '@/components/Structure/Loader'

const CabinViewWrapper = props => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id ? 'Edit this cabin here.' : 'Add a new cabin here.'}
      </p>

      <CabinForm
        {...props.fields}
        onChange={props.onFieldChange}
        onDeleteCabin={props.onDeleteCabin}
      />
    </>
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
