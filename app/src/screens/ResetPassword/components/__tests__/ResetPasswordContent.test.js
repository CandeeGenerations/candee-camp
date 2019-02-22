import React from 'react'
import * as testingUtils from '../../../../../test/testing-utils'

import ResetPasswordContent from '../ResetPasswordContent'

describe(testingUtils.formatDescribeName('Reset Password Content'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const fields = {
      newPassword: {value: ''},
      confirmPassword: {value: ''},
    }
    const loading = false
    const validForm = false

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId, getByText} = testingUtils.render(
      <ResetPasswordContent {...props} />,
    )

    /* Assertions */
    // title displays correctly
    expect(getByText('Reset your password?')).toBeTruthy()

    // header displays correctly
    expect(
      getByText('Enter a new password to reset your password.'),
    ).toBeTruthy()

    // sign in button displays correctly
    expect(getByText('Reset password')).toBeTruthy()

    // sign in button is disabled
    expect(getByTestId('resetPasswordButton')).toHaveAttribute('disabled')
  })

  test(
    testingUtils.formatTestName(
      'cannot be submitted if passwords do not match',
    ),
    () => {
      /* Constants */
      const fields = {
        newPassword: {value: 'abc123!'},
        confirmPassword: {value: 'foobar'},
      }
      const loading = false
      const validForm = false

      const onFieldChange = testingUtils.emptyFunction()
      const onSubmit = testingUtils.emptyFunction()

      const props = {fields, loading, onFieldChange, onSubmit, validForm}

      /* Create component */
      const {getByTestId, getByText} = testingUtils.render(
        <ResetPasswordContent {...props} />,
      )

      /* Assertions */
      // try to click submit button
      testingUtils.fireEvent(
        getByText('Reset password'),
        testingUtils.mouseEvent(),
      )

      // submit button not clicked
      expect(onSubmit).not.toHaveBeenCalledTimes(1)
    },
  )

  test(testingUtils.formatTestName('can be submitted'), () => {
    /* Constants */
    const fields = {
      newPassword: {value: 'abc123!'},
      confirmPassword: {value: 'abc123!'},
    }
    const loading = false
    const validForm = true

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId, getByText} = testingUtils.render(
      <ResetPasswordContent {...props} />,
    )

    /* Assertions */
    // click submit button
    testingUtils.fireEvent(
      getByText('Reset password'),
      testingUtils.mouseEvent(),
    )

    // submit button clicked
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  test(testingUtils.formatTestName('button is loading'), () => {
    /* Constants */
    const fields = {
      newPassword: {value: 'abc123!'},
      confirmPassword: {value: 'abc123!'},
    }
    const loading = true
    const validForm = true

    const onFieldChange = testingUtils.emptyFunction()
    const onSubmit = testingUtils.emptyFunction()

    const props = {fields, loading, onFieldChange, onSubmit, validForm}

    /* Create component */
    const {getByTestId} = testingUtils.render(
      <ResetPasswordContent {...props} />,
    )

    /* Assertions */
    // submit button loading
    expect(getByTestId('resetPasswordButton')).toHaveClass('ant-btn-loading')
  })
})
