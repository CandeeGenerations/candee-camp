import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import RegistrationForm from './RegistrationForm'

const RegistrationViewWrapper = (props) => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id
          ? 'Edit this registration here.'
          : 'Add a new registration here.'}
      </p>

      <RegistrationForm
        {...props.fields}
        campersList={props.campersList}
        eventsList={props.eventsList}
        onChange={props.onFieldChange}
        onDeleteRegistration={props.onDeleteRegistration}
      />
    </>
  )
}

RegistrationViewWrapper.propTypes = {
  campersList: PropTypes.array.isRequired,
  eventsList: PropTypes.array.isRequired,
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteRegistration: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(RegistrationViewWrapper)
