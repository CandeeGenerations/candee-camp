import React from 'react'
import * as testingUtils from '../../../../../test/testing-utils'

import NavBarContent from '../NavBarContent'

describe(testingUtils.formatDescribeName('Nav Bar Content'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const loading = {signout: false}
    const navItems = [
      {name: 'nav 1', routeName: 'nav1'},
      {name: 'nav 2', routeName: 'nav2'},
    ]

    /* Mock functions */
    const onSignout = testingUtils.emptyFunction()

    const props = {loading, navItems, onSignout}

    /* Create component */
    const {getByText, queryByText} = testingUtils.renderWithRouter(
      <NavBarContent {...props} />,
    )

    /* Assertions */
    // displays correctly
    expect(getByText(/Candee Camp/)).toBeTruthy()

    // nav links exist
    navItems.forEach(item =>
      expect(getByText(new RegExp(item.name))).toBeTruthy(),
    )

    // user icon exists
    expect(
      getByText((content, element) =>
        testingUtils.getElement(element, 'i', 'ion-md-contact'),
      ),
    ).toBeTruthy()

    // active link does not exist
    expect(
      queryByText((content, element) =>
        testingUtils.getElement(element, 'li', 'ant-menu-item-selected'),
      ),
    ).toBeNull()
  })

  test(
    testingUtils.formatTestName('displays correctly with active link'),
    () => {
      /* Constants */
      const loading = {signout: false}
      const navItems = [
        {name: 'nav 1', routeName: 'nav1'},
        {name: 'nav 2', routeName: 'nav2'},
      ]
      const selectedItem = {name: 'nav 1', routeName: 'nav1'}

      /* Mock functions */
      const onSignout = testingUtils.emptyFunction()

      const props = {loading, navItems, onSignout, selectedItem}

      /* Create component */
      const {getByText} = testingUtils.renderWithRouter(
        <NavBarContent {...props} />,
      )

      /* Assertions */
      // active link exists
      expect(
        getByText((content, element) =>
          testingUtils.getElement(element, 'li', 'ant-menu-item-selected'),
        ),
      ).toBeTruthy()
    },
  )
})
