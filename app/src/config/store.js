import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {router5Middleware} from 'redux-router5'
import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from '../reducers'
import router from './router'

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
let composeEnhancers = compose

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
}

export function configureStore(theRouter, state = {}) {
  const middleware = applyMiddleware(
    thunk,
    router5Middleware(theRouter),
    process.env.NODE_ENV === 'development' ? createLogger() : null,
  )
  const enhancers = composeEnhancers(middleware)
  const store = createStore(rootReducer, state, enhancers)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const store = configureStore(router)

export default store
