import React from 'react'
import PropTypes from 'prop-types'
import {Result, Button} from 'antd'

const EmptyState = props => {
  return (
    <Result
      extra={
        <Button type="primary" onClick={props.onCreateNew}>
          Create {props.title}
        </Button>
      }
      status="warning"
      subTitle="You can create one now!"
      title={`There are no ${props.title.toLowerCase()}s yet.`}
    />
  )
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,

  // functions
  onCreateNew: PropTypes.func.isRequired,
}

export default EmptyState
