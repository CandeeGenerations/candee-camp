import React from 'react'
import {Progress} from 'antd'
import PropTypes from 'prop-types'

import Config from '@/config'
import {percentComplete} from '@/helpers'

const ProgressBar = (props) => {
  const percent = percentComplete(props.fields)

  return (
    Config.features.loadingBar && (
      <Progress percent={percent} showInfo={false} />
    )
  )
}

ProgressBar.propTypes = {
  fields: PropTypes.shape({}).isRequired,
}

export default ProgressBar
