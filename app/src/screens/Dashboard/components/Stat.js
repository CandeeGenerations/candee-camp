/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Card, Statistic} from 'antd'

import loader from '@/components/Structure/Loader'

const Stat = props => (
  <Card css={{marginBottom: 20}}>
    {props.loader.spinning ? (
      <div css={{minHeight: 75}} />
    ) : (
      <Statistic title={props.title} value={props.value} />
    )}
  </Card>
)

Stat.defaultProps = {
  value: 0,
}

Stat.propTypes = {
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export default loader(Stat)
