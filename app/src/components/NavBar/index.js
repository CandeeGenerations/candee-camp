import React, {useContext, useState} from 'react'
import {routerContext, routeContext} from 'react-router5'

import {signinActions as actions} from '../../actions'

import NavBarContent from './components/NavBarContent'

const NavBar = () => {
  const route = useContext(routeContext)
  const router = useContext(routerContext)
  const [loading, setLoading] = useState(false)

  const handleSignout = async () => {
    setLoading(true)

    await actions.signout()

    setLoading(false)

    router.navigate('signin')
  }

  const navItems = [
    {
      name: 'Events',
      routeName: 'events',
    },
  ]
  const selected = navItems.find(item => item.routeName === route.name)

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
