import React from 'react'
import * as testingUtils from '../../../../test/testing-utils'

import SigninLayout from '../SigninLayout'

describe(testingUtils.formatDescribeName('Signin Layout'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const children = <div>children</div>
    const title = 'title'

    const props = {children, title}

    /* Create component */
    const {getByText} = testingUtils.render(<SigninLayout {...props} />)

    /* Assertions */
    // children display correctly
    expect(getByText('children')).toBeTruthy()

    // title displays correctly
    expect(getByText(title)).toBeTruthy()
  })
})
