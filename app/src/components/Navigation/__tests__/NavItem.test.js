import React from 'react'
import * as testingUtils from '../../../../test/testing-utils'

import NavItem from '../NavItem'

describe(testingUtils.formatDescribeName('Nav Item'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const children = 'link'
    const className = 'class name'
    const routeName = 'route'

    const props = {children, className, routeName}

    /* Create component */
    const {getByText} = testingUtils.renderWithRouter(<NavItem {...props} />)

    /* Assertions */
    // the link exists
    expect(getByText(children)).toBeTruthy()

    // the link has the correct class
    expect(getByText(children)).toHaveClass(className)
  })

  test(testingUtils.formatTestName('handles click'), () => {
    /* Constants */
    const children = 'link'
    const routeName = 'route'

    /* Mock functions */
    const onClick = testingUtils.emptyFunction()

    const props = {children, onClick, routeName}

    /* Create component */
    const {getByText} = testingUtils.renderWithRouter(<NavItem {...props} />)

    /* Assertions */
    // click the link
    testingUtils.fireEvent(getByText(children), testingUtils.mouseEvent())

    // link clicked
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
