import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import GroupForm from './GroupForm'

const GroupViewWrapper = (props) => {
  return props.loader.spinning ? null : (
    <React.Fragment>
      <p>
        {props.fields.id ? 'Edit this group here.' : 'Add a new group here.'}
      </p>

      <GroupForm
        {...props.fields}
        campersList={props.campersList}
        usersList={props.usersList}
        onChange={props.onFieldChange}
        onCreateNewAccount={props.onCreateNewAccount}
        onDeleteGroup={props.onDeleteGroup}
      />
    </React.Fragment>
  )
}

GroupViewWrapper.propTypes = {
  campersList: PropTypes.array.isRequired,
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  usersList: PropTypes.array.isRequired,

  // functions
  onCreateNewAccount: PropTypes.func.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(GroupViewWrapper)
