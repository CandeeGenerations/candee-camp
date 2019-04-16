import React from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'

const NavItem = props => {
  const router = useRouter()
  const href = router.buildUrl(props.routeName, props.params)
  const handleClick = evt => {
    evt.preventDefault()

    if (props.onClick) {
      props.onClick(evt)
    }

    router.navigate(props.routeName, props.params, props.options)
  }

  const linkProps = {className: props.className, href}

  if (!props.noClick) {
    linkProps.onClick = handleClick
  }

  return <a {...linkProps}> {props.children} </a>
}

NavItem.defaultProps = {
  children: null,
  className: '',
  noClick: false,
  onClick: null,
  options: {},
  params: {},
}

NavItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  noClick: PropTypes.bool,
  options: PropTypes.shape({}),
  params: PropTypes.shape({}),
  routeName: PropTypes.string.isRequired,

  // functions
  onClick: PropTypes.func.isRequired,
}

export default NavItem
