/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'

const MainContent = (props) => {
  return (
    <section css={{padding: 50, minHeight: 1000}}>{props.children}</section>
  )
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainContent
