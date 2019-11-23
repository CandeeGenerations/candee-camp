/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import moment from 'moment'
import PropTypes from 'prop-types'

import Config from '@/config'

const Version = props => {
  const versionStyle = css`
    color: #333;
    font-size: 11px;
    margin: 0 15px 10px auto;
  `
  const lightStyle = css`
    right: 0;
    bottom: 0;
    color: #ccc;
    position: absolute;
  `

  return (
    <div css={props.light ? [versionStyle, lightStyle] : versionStyle}>
      v {Config.version} &copy; {moment().format('YYYY')} Candee Generations
    </div>
  )
}

Version.defaultProps = {
  light: false,
}

Version.propTypes = {
  light: PropTypes.bool,
}

export default Version
