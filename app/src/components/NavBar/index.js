import React from 'react'
import {useRoute} from 'react-router5'

import NavBarContent from './components/NavBarContent'

import usePage from '@/helpers/hooks/usePage'
import {removeUser} from '@/helpers/authHelpers'

const NavBar = () => {
  const page = usePage()
  const routerContext = useRoute()

  const handleSignout = () => {
    removeUser()
    routerContext.router.navigate('signin')
  }

  const navItems = [
    {
      icon: 'calendar',
      name: 'Events',
      routeName: page.eventsPage,
    },
    {
      icon: 'team',
      name: 'Visitors',
      routeName: page.visitorsPage,
    },
    {
      icon: 'appstore',
      name: 'Camp Management',
      routeName: page.campPage,
    },
  ]

  const selected = navItems.find((item) =>
    routerContext.route.name.includes(item.routeName),
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
