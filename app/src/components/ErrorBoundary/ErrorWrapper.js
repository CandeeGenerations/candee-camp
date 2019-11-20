/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState} from 'react'
import {Button} from 'antd'
import PropTypes from 'prop-types'

export const useError = () => {
  const [hasError, setHasError] = useState(false)

  const handleCatchError = () => setHasError(true)

  return {hasError, handleCatchError}
}

const ErrorWrapper = props => {
  return props.hasError ? (
    <div css={{textAlign: 'center'}}>
      <h1>There was an error.</h1>
      <Button onClick={props.handleRetry}>Try again</Button>
    </div>
  ) : (
    props.children
  )
}

ErrorWrapper.defaultProps = {
  hasError: false,
}

ErrorWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool,

  // functions
  handleRetry: PropTypes.func.isRequired,
}

export default ErrorWrapper
