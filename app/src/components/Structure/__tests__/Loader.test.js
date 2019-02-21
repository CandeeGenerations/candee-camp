import React from 'react'
import * as testingUtils from '../../../../test/testing-utils'

import loader, {LoaderContext} from '../Loader'

const TestContent = loader(({loader: {spinning}}) => (
  <div>{spinning ? 'spinning' : 'not spinning'}</div>
))

describe(testingUtils.formatDescribeName('Loader'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly while spinning'), () => {
    /* Constants */
    const value = {
      spinning: true,
      tip: 'tip',
    }

    const props = {value}

    /* Create component */
    const {getByText, queryByText} = testingUtils.render(
      <LoaderContext.Provider {...props}>
        <TestContent />
      </LoaderContext.Provider>,
    )

    /* Assertions */
    // tip displays correctly
    expect(getByText(value.tip)).toBeTruthy()

    // spinner exists
    expect(
      getByText((content, element) =>
        testingUtils.getElement(element, 'div', 'ant-spin ant-spin-spinning'),
      ),
    ).toBeTruthy()

    // content exists and is correct
    expect(getByText('spinning')).toBeTruthy()
    expect(queryByText('not spinning')).toBeNull()
  })

  test(
    testingUtils.formatTestName('displays correctly while not spinning'),
    () => {
      /* Constants */
      const value = {
        spinning: false,
      }

      const props = {value}

      /* Create component */
      const {getByText, queryByText} = testingUtils.render(
        <LoaderContext.Provider {...props}>
          <TestContent />
        </LoaderContext.Provider>,
      )

      /* Assertions */
      // spinner exists
      expect(
        queryByText((content, element) =>
          testingUtils.getElement(element, 'div', 'ant-spin ant-spin-spinning'),
        ),
      ).toBeNull()

      // content exists and is correct
      expect(getByText('not spinning')).toBeTruthy()
      expect(queryByText('spinning')).toBeNull()
    },
  )
})
