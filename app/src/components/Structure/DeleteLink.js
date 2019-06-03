import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Popconfirm} from 'antd'

/* eslint jsx-a11y/anchor-is-valid: 0 */

const DeleteLink = props => {
  return (
    <Popconfirm
      cancelText="Cancel"
      icon={<Icon style={{color: 'red'}} type="question-circle-o" />}
      okText="Delete"
      okType="danger"
      placement="topRight"
      {...props}
    >
      <a>Delete</a>
    </Popconfirm>
  )
}

DeleteLink.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  // functions
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteLink
