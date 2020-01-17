import React from 'react'
import PropTypes from 'prop-types'

class IncludeScript extends React.Component {
  componentDidMount() {
    const node = document.querySelector(`#${this.props.id}`)

    if (!node) {
      const script = document.createElement('script')

      script.src = this.props.src
      script.async = this.props.async
      script.id = this.props.id

      document.body.appendChild(script)
    }
  }

  componentWillUnmount() {
    const node = document.querySelector(`#${this.props.id}`)

    if (node) {
      node.parentNode.removeChild(node)
    }
  }

  render() {
    return this.props.children
  }
}

IncludeScript.defaultProps = {
  async: false,
}

IncludeScript.propTypes = {
  async: PropTypes.bool,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default IncludeScript
