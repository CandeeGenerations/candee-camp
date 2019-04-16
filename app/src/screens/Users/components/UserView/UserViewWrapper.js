import React from 'react'
import PropTypes from 'prop-types'

import loader from '../../../../components/Structure/Loader'

import UserForm from './UserForm'

const UserViewWrapper = props =>
  props.loader.spinner ? null : (
    <>
      <p>{props.fields.id ? 'Edit the user here.' : 'Add a new user here.'}</p>

      <UserForm {...props.fields} onChange={props.onFieldChange} />
    </>
  )

UserViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinner: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(UserViewWrapper)
