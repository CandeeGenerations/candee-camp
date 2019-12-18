/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Statistic} from 'antd'
import PropTypes from 'prop-types'

import {formatCurrency} from '@/helpers'
import loader from '@/components/Structure/Loader'

const RemainingBalance = props => {
  const amount = props.startingBalance - props.totalPurchasePrice

  return props.loader.spinning ? (
    <div css={{minHeight: 100}} />
  ) : (
    <Statistic
      formatter={formatCurrency}
      title="Remaining Balance"
      value={amount}
      valueStyle={{
        color:
          amount < 1 ? 'red' : amount >= 1 && amount < 5 ? 'gold' : 'green',
      }}
    />
  )
}

RemainingBalance.propTypes = {
  startingBalance: PropTypes.number.isRequired,
  totalPurchasePrice: PropTypes.number.isRequired,
}

export default loader(RemainingBalance)
