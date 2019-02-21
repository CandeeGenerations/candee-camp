import React from 'react'
import 'jest-dom/extend-expect'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {RouterProvider} from 'react-router5'
import {render} from 'react-testing-library'

import router from '../src/config/router'
import reducer from '../src/reducers'

function getElement(element, tag, className) {
  return (
    element.tagName.toLowerCase() === tag &&
    element.className.includes(className)
  )
}

function emptyFunction() {
  return jest.fn()
}

function mouseEvent() {
  return new MouseEvent('click', {
    bubbles: true, // click events must bubble for React to see it
    cancelable: true,
  })
}

function formatDescribeName(title) {
  return `\n\t== ${title} ==\n`
}

function formatTestName(title) {
  return `=> ${title}`
}

function renderWithRedux(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ui,
  }
}

function renderWithReduxAndRouter(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...render(
      <Provider store={store}>
        <RouterProvider router={router}>{ui}</RouterProvider>
      </Provider>,
    ),
    ui,
  }
}

function generateInitialState(overrides = {}) {
  return {
    ...overrides,
  }
}

export {render, cleanup, fireEvent, wait} from 'react-testing-library'

export {
  emptyFunction,
  formatDescribeName,
  formatTestName,
  generateInitialState,
  getElement,
  mouseEvent,
  renderWithRedux,
  renderWithReduxAndRouter,
}
