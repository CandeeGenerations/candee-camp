import React from 'react'
import PropTypes from 'prop-types'

import loader from '../../../../components/Structure/Loader'

import EventForm from './EventForm'

const EventViewWrapper = props =>
  props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id ? 'Edit your event here.' : 'Add a new event here.'}
      </p>

      <EventForm {...props.fields} onChange={props.onFieldChange} />
    </>
  )

EventViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(EventViewWrapper)
