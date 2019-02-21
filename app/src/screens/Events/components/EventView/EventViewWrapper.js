import React from 'react'

import loader from '../../../../components/Structure/Loader'

import EventForm from './EventForm'

type Props = {
  fields: {},
  loader: {
    spinner: boolean,
  },

  // functions
  onFieldChange: () => void,
}

const EventViewWrapper = (props: Props) =>
  props.loader.spinner ? null : (
    <>
      <p>
        {props.fields.id ? 'Edit your event here.' : 'Add a new event here.'}
      </p>

      <EventForm {...props.fields} onChange={props.onFieldChange} />
    </>
  )

export default loader(EventViewWrapper)
