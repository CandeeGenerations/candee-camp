/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Typography} from 'antd'
import PropTypes from 'prop-types'

const CodeCopy = (props) => {
  return (
    <Typography.Text code copyable>
      {props.children}
    </Typography.Text>
  )
}

CodeCopy.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CodeCopy
