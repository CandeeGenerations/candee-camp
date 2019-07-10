import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {Route, RouterProvider} from 'react-router5'
import {render} from '@testing-library/react'

import router from '../src/config/router'

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

function renderWithRouter(ui) {
  return {
    ...render(
      <RouterProvider router={router}>
        <Route>{() => ui}</Route>
      </RouterProvider>,
    ),
    ui,
  }
}

function generateInitialState(overrides = {}) {
  return {
    ...overrides,
  }
}

export {render, cleanup, fireEvent, wait} from '@testing-library/react'

export {
  emptyFunction,
  formatDescribeName,
  formatTestName,
  generateInitialState,
  getElement,
  mouseEvent,
  renderWithRouter,
}
