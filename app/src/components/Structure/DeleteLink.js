import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Icon, Popconfirm} from 'antd'

/* eslint jsx-a11y/anchor-is-valid: 0 */

const DeleteLink = props => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)

    await props.onConfirm()

    setLoading(false)
  }

  return (
    <Popconfirm
      {...props}
      cancelText="Cancel"
      icon={<Icon style={{color: 'red'}} type="question-circle-o" />}
      okText="Delete"
      okType="danger"
      placement="topRight"
      onConfirm={handleConfirm}
    >
      {loading ? <Icon type="loading" /> : <a>Delete</a>}
    </Popconfirm>
  )
}

DeleteLink.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  // functions
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteLink
