import React from 'react'
import * as testingUtils from '../../../../../test/testing-utils'

import SigninContent from '../SigninContent'

describe(testingUtils.formatDescribeName('Signin Content'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const fields = {
      email: {value: ''},
      password: {value: ''},
    }
    const loading = false
    const validForm = false

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId, getByText} = testingUtils.renderWithReduxAndRouter(
      <SigninContent {...props} />,
    )

    /* Assertions */
    // title displays correctly
    expect(getByText('Sign in')).toBeTruthy()

    // header displays correctly
    expect(
      getByText('Welcome back! We are happy you like Candee Camp.'),
    ).toBeTruthy()

    // forgot password displays correctly
    expect(getByText('Forgot password?')).toBeTruthy()

    // sign in button displays correctly
    expect(
      getByText(
        (content, element) =>
          element.tagName.toLowerCase() === 'span' && content === 'Sign in',
      ),
    ).toBeTruthy()

    // sign in button is disabled
    expect(getByTestId('signinButton')).toHaveAttribute('disabled')
  })

  test(testingUtils.formatTestName('can be submitted'), () => {
    /* Constants */
    const fields = {
      email: {value: 'test@test.com'},
      password: {value: 'abc123'},
    }
    const loading = false
    const validForm = true

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId, getByText} = testingUtils.renderWithReduxAndRouter(
      <SigninContent {...props} />,
    )

    /* Assertions */
    // click submit button
    testingUtils.fireEvent(
      getByText(
        (content, element) =>
          element.tagName.toLowerCase() === 'span' && content === 'Sign in',
      ),
      testingUtils.mouseEvent(),
    )

    // submit button clicked
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  test(testingUtils.formatTestName('button is loading'), () => {
    /* Constants */
    const fields = {
      email: {value: 'test@test.com'},
      password: {value: 'abc123'},
    }
    const loading = true
    const validForm = true

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId} = testingUtils.renderWithReduxAndRouter(
      <SigninContent {...props} />,
    )

    /* Assertions */
    // submit button loading
    expect(getByTestId('signinButton')).toHaveClass('ant-btn-loading')
  })
})
