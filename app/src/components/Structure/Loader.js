import React from 'react'
import {Spin} from 'antd'

export const LoaderContext = React.createContext({
  spinning: false,
  tip: 'Loading...',
})

export default (Component: React.ReactNode) => (props: {}) => (
  <LoaderContext.Consumer>
    {loaderContext => (
      <Spin {...loaderContext}>
        <Component loader={loaderContext} {...props} />
      </Spin>
    )}
  </LoaderContext.Consumer>
)
