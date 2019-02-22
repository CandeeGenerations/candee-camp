import React from 'react'
import {useRouter} from 'react-router5'

type Props = {
  children?: any,
  className?: string,
  noClick?: boolean,
  options?: {},
  params?: {},
  routeName: string,

  // functions
  onClick?: () => void,
}

const NavItem = (props: Props) => {
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

export default NavItem
