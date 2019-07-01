import React from 'react'
import {useRoute} from 'react-router5'

import {removeUser} from '../../helpers/authHelpers'

import NavBarContent from './components/NavBarContent'

const NavBar = () => {
  const routerContext = useRoute()

  const handleSignout = () => {
    removeUser()
    routerContext.router.navigate('signin')
  }

  const navItems = [
    {
      icon: 'calendar',
      name: 'Events',
      routeName: 'events',
    },
    {
      icon: 'user',
      name: 'Users',
      routeName: 'users',
    },
  ]
  const selected = navItems.find(
    item => item.routeName === routerContext.route.name,
  )

  return (
    <NavBarContent
      navItems={navItems}
      selectedItem={selected}
      onSignout={handleSignout}
    />
  )
}

export default NavBar
