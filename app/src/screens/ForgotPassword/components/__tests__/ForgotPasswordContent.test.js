import React from 'react'
import * as testingUtils from '../../../../../test/testing-utils'

import ForgotPasswordContent from '../ForgotPasswordContent'

describe(testingUtils.formatDescribeName('Forgot Password Content'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const fields = {
      email: {value: ''},
    }
    const loading = false
    const validForm = false

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId, getByText} = testingUtils.renderWithReduxAndRouter(
      <ForgotPasswordContent {...props} />,
    )

    /* Assertions */
    // title displays correctly
    expect(getByText('Forgot your password?')).toBeTruthy()

    // header displays correctly
    expect(
      getByText("Enter your email below, and we'll send you the reset link."),
    ).toBeTruthy()

    // forgot password displays correctly
    expect(getByText('Back to sign in')).toBeTruthy()

    // sign in button displays correctly
    expect(getByText('Send reset link')).toBeTruthy()

    // sign in button is disabled
    expect(getByTestId('sendResetLinkButton')).toHaveAttribute('disabled')
  })

  test(testingUtils.formatTestName('can be submitted'), () => {
    /* Constants */
    const fields = {
      email: {value: 'test@test.com'},
    }
    const loading = false
    const validForm = true

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId, getByText} = testingUtils.renderWithReduxAndRouter(
      <ForgotPasswordContent {...props} />,
    )

    /* Assertions */
    // click submit button
    testingUtils.fireEvent(
      getByText('Send reset link'),
      testingUtils.mouseEvent(),
    )

    // submit button clicked
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  test(testingUtils.formatTestName('button is loading'), () => {
    /* Constants */
    const fields = {
      email: {value: 'test@test.com'},
    }
    const loading = true
    const validForm = true

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId} = testingUtils.renderWithReduxAndRouter(
      <ForgotPasswordContent {...props} />,
    )

    /* Assertions */
    // submit button loading
    expect(getByTestId('sendResetLinkButton')).toHaveClass('ant-btn-loading')
  })
})
