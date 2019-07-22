import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import Config from '@/config'

import './version.scss'

const Version = props => (
  <div className={`cc--version ${props.light ? 'light' : ''}`}>
    v {Config.version} &copy; {dayjs().format('YYYY')} Candee Generations
  </div>
)

Version.defaultProps = {
  light: false,
}

Version.propTypes = {
  light: PropTypes.bool,
}

export default Version
