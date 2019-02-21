import React, {useState} from 'react'
import {Button} from 'antd'

type Props = {
  children: React.Node,
  hasError: boolean,

  // functions
  handleRetry: () => void,
}

export const useError = () => {
  const [hasError, setHasError] = useState(false)

  const handleCatchError = () => setHasError(true)

  return {hasError, handleCatchError}
}

export default (props: Props = {hasError: false}) => {
  return props.hasError ? (
    <div style={{textAlign: 'center'}}>
      <h1>There was an error.</h1>
      <Button onClick={props.handleRetry}>Try again</Button>
    </div>
  ) : (
    props.children
  )
}
