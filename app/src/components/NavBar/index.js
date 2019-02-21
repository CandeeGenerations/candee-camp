import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createRouteNodeSelector, actions as routerActions} from 'redux-router5'

import {signinActions as actions} from '../../actions'

import NavBarContent from './components/NavBarContent'

type Props = {
  loading: {},
  route?: {name: string},

  // functions
  navigateTo: () => void,
  signout: () => void,
}

const NavBar = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const handleSignout = async () => {
    setLoading(true)

    await props.signout()

    setLoading(false)

    props.navigateTo('signin')
  }

  const navItems = [
    {
      name: 'Events',
      routeName: 'events',
    },
  ]
  const selected = navItems.find(item => item.routeName === props.route.name)

  return (
    <NavBarContent
      loading={loading}
      navItems={navItems}
      selectedItem={selected}
      onSignout={handleSignout}
    />
  )
}

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: routerActions.navigateTo,
      signout: actions.signout,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)
