import React from 'react'
import {connect} from 'react-redux'
import {actions} from 'redux-router5'
import {withRoute} from 'react-router5'
import {compose, bindActionCreators} from 'redux'

type Props = {
  children?: any,
  className?: string,
  noClick?: boolean,
  options?: {},
  params?: {},
  routeName: string,

  // functions
  navigateTo: (routeName: string, params: {}, options: {}) => void,
  onClick?: () => void,
}

const NavItem = (props: Props) => {
  const href = props.router.buildUrl(props.routeName, props.params)
  const handleClick = evt => {
    evt.preventDefault()

    if (props.onClick) {
      props.onClick(evt)
    }

    props.navigateTo(props.routeName, props.params, props.options)
  }

  const linkProps = {className: props.className, href}

  if (!props.noClick) {
    linkProps.onClick = handleClick
  }

  return <a {...linkProps}> {props.children} </a>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: actions.navigateTo,
    },
    dispatch,
  )

NavItem.defaultProps = {
  children: null,
  className: '',
  noClick: false,
  onClick: null,
  options: {},
  params: {},
}

export default compose(
  withRoute,
  connect(
    null,
    mapDispatchToProps,
  ),
)(NavItem)
