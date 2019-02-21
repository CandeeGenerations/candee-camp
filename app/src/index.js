import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {RouterProvider} from 'react-router5'

import App from './screens/App'
import store from './config/store'
import router from './config/router'
import * as serviceWorker from './serviceWorker'

import './main.scss'

const render = Component => {
  router.setDependency('store', store)
  router.start(() => {
    ReactDOM.render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <Component />
        </RouterProvider>
      </Provider>,
      document.getElementById('cgen-root'),
    )
  })
}

render(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
