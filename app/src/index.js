import React from 'react'
import ReactDOM from 'react-dom'
import {Route, RouterProvider} from 'react-router5'

import App from './screens/App'
import router from './config/router'
import * as serviceWorker from './serviceWorker'

import './main.scss'

ReactDOM.render(
  <RouterProvider router={router}>
    <Route>{() => <App />}</Route>
  </RouterProvider>,
  document.getElementById('cgen-root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
