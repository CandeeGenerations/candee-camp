import React, {useState} from 'react'
import {useRoute} from 'react-router5'

import {signinActions as actions} from '../../actions'

import NavBarContent from './components/NavBarContent'

const NavBar = () => {
  const routerContext = useRoute()
  const [loading, setLoading] = useState(false)

  const handleSignout = async () => {
    setLoading(true)

    await actions.signout()

    setLoading(false)

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
      loading={loading}
      navItems={navItems}
      selectedItem={selected}
      onSignout={handleSignout}
    />
  )
}

export default NavBar
