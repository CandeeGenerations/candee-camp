/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState} from 'react'
import PropTypes from 'prop-types'
import {Icon, Popconfirm} from 'antd'

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
      icon={<Icon css={{color: 'red'}} type="question-circle-o" />}
      okText="Delete"
      okType="danger"
      overlayStyle={{zIndex: 1060}}
      placement="topRight"
      onConfirm={handleConfirm}
    >
      {loading ? <Icon type="loading" /> : <a style={props.style}>Delete</a>}
    </Popconfirm>
  )
}

DeleteLink.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  // functions
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteLink
