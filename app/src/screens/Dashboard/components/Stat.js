/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import {Card, Statistic} from 'antd'

import loader from '@/components/Structure/Loader'

const Stat = props => (
  <Card css={{marginBottom: 20}}>
    {props.loader.spinning ? (
      <div css={{minHeight: 87}} />
    ) : (
      <>
        <Statistic title={props.title} value={props.value} />

        {props.children}
      </>
    )}
  </Card>
)

Stat.defaultProps = {
  children: null,
  value: 0,
}

Stat.propTypes = {
  children: PropTypes.node,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export default loader(Stat)
