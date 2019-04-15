import React from 'react'
import {Card, Statistic} from 'antd'

import loader from '../../../components/Structure/Loader'

type Props = {
  loader: {
    spinning: boolean,
  },
  title: string,
  value: number,
}

const Stat = (props: Props) => (
  <Card>
    {props.loader.spinning ? (
      <div style={{minHeight: 75}} />
    ) : (
      <Statistic title={props.title} value={props.value} />
    )}
  </Card>
)

export default loader(Stat)
