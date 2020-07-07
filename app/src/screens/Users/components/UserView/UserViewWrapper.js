import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import UserForm from './UserForm'

const UserViewWrapper = (props) => {
  return props.loader.spinning ? null : (
    <>
      <p>{props.fields.id ? 'Edit this user here.' : 'Add a new user here.'}</p>

      <UserForm
        {...props.fields}
        onChange={props.onFieldChange}
        onDeleteUser={props.onDeleteUser}
        onPasswordChange={props.onPasswordChange}
      />
    </>
  )
}

UserViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteUser: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
}

export default loader(UserViewWrapper)
