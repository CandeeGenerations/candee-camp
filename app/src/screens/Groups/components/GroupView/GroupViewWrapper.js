import React from 'react'
import PropTypes from 'prop-types'

import GroupForm from './GroupForm'

import loader from '@/components/Structure/Loader'

const GroupViewWrapper = props => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id ? 'Edit this group here.' : 'Add a new group here.'}
      </p>

      <GroupForm
        {...props.fields}
        campersList={props.campersList}
        onChange={props.onFieldChange}
        onDeleteGroup={props.onDeleteGroup}
      />
    </>
  )
}

GroupViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteGroup: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(GroupViewWrapper)
