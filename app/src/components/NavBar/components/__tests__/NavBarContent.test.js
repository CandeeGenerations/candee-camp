import React from 'react'
import * as testingUtils from '../../../../../test/testing-utils'

import NavBarContent from '../NavBarContent'

describe(testingUtils.formatDescribeName('Nav Bar Content'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const navItems = [
      {
        icon: 'calendar',
        name: 'nav 1',
        routeName: 'nav1',
      },
      {
        icon: 'user',
        name: 'nav 2',
        routeName: 'nav2',
      },
    ]

    /* Mock functions */
    const onSignout = testingUtils.emptyFunction()

    const props = {navItems, onSignout}

    /* Create component */
    const {getByText, queryByText} = testingUtils.renderWithRouter(
      <NavBarContent {...props} />,
    )

    /* Assertions */
    // displays correctly
    expect(getByText(/CC/)).toBeTruthy()

    // nav links exist
    navItems.forEach(item =>
      expect(getByText(new RegExp(item.name))).toBeTruthy(),
    )

    // user icon exists
    expect(
      getByText((content, element) =>
        testingUtils.getElement(element, 'i', 'anticon anticon-logout'),
      ),
    ).toBeTruthy()

    // active link does not exist
    expect(
      queryByText((content, element) =>
        testingUtils.getElement(element, 'li', 'ant-menu-item-selected'),
      ),
    ).toBeNull()
  })
})
