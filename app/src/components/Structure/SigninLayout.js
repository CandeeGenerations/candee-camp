import React from 'react'
import PropTypes from 'prop-types'

import './signinLayout.scss'

const SigninLayout = props => {
  return (
    <div className="cc--signin-layout">
      <div className="cc--content">{props.children}</div>

      <div className="cc--title-wrapper">
        <div className="cc--title">{props.title}</div>
      </div>
    </div>
  )
}

SigninLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default SigninLayout
