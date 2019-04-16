import React from 'react'
import PropTypes from 'prop-types'
import {Card, Statistic} from 'antd'

import loader from '../../../components/Structure/Loader'

const Stat = props => (
  <Card>
    {props.loader.spinning ? (
      <div style={{minHeight: 75}} />
    ) : (
      <Statistic title={props.title} value={props.value} />
    )}
  </Card>
)

Stat.propTypes = {
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default loader(Stat)
