import React from 'react'
import * as testingUtils from '../../../../test/testing-utils'

import Copyright from '../Copyright'

describe(testingUtils.formatDescribeName('Copyright'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const date = new Date().getFullYear()

    /* Create component */
    const {getByText} = testingUtils.render(<Copyright />)

    /* Assertions */
    // displays correctly
    expect(getByText(/2017/)).toBeTruthy()
    expect(getByText(new RegExp(date))).toBeTruthy()
    expect(getByText(/Candee Generations/)).toBeTruthy()
    expect(getByText(/, LLC. All Rights Reserved./)).toBeTruthy()
  })
})
