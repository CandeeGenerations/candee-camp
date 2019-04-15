import React from 'react'

import loader from '../../../../components/Structure/Loader'

import UserForm from './UserForm'

type Props = {
  fields: {},
  loader: {
    spinner: boolean,
  },

  // functions
  onFieldChange: () => void,
}

const UserViewWrapper = (props: Props) =>
  props.loader.spinner ? null : (
    <>
      <p>{props.fields.id ? 'Edit the user here.' : 'Add a new user here.'}</p>

      <UserForm {...props.fields} onChange={props.onFieldChange} />
    </>
  )

export default loader(UserViewWrapper)
