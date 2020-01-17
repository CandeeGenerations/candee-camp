/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Typography} from 'antd'

const Free = () => {
  return (
    <div css={{margin: '10px 0'}}>
      <Typography.Title level={3}>This event is free!</Typography.Title>

      <p>No payment is required.</p>
    </div>
  )
}

export default Free
