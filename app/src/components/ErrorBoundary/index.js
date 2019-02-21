import React from 'react'
import equal from 'deep-equal'

type Props = {
  router: {},
}

class ErrorBoundary extends React.Component<Props> {
  state = {error: null, hasError: false}

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.router.route, this.props.router.route)) {
      this.setState({error: null, hasError: false})
    }
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error}
  }

  componentDidCatch(error) {
    this.setState({error, hasError: true})
  }

  render() {
    if (this.state.hasError) {
      console.error(this.state.error) // eslint-disable-line
      return <div>Error</div>
    }

    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary
