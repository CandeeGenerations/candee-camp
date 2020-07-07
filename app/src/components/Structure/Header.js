/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {useRoute} from 'react-router5'
import {Menu, Layout, Affix, Icon} from 'antd'

import {NavItem} from '@/components/Navigation'

import {removeUser} from '@/helpers/authHelpers'

import logo from '../../content/images/logo-long-color.png'

const Header = () => {
  const routerContext = useRoute()

  const handleSignout = () => {
    removeUser()
    routerContext.router.navigate('signin')
  }

  return (
    <Affix
      css={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        zIndex: 2,
      }}
    >
      <Layout.Header>
        <Menu
          mode="horizontal"
          style={{backgroundColor: '#fff', lineHeight: '64px'}}
        >
          <NavItem options={{reload: true}} routeName="dashboard">
            <img css={{maxHeight: 50, marginLeft: 20}} src={logo} />
          </NavItem>

          <Menu.SubMenu
            css={{float: 'right', marginRight: 25}}
            title={
              <span>
                <Icon type="user" />
                User
              </span>
            }
          >
            <Menu.Item>
              <a
                css={{
                  color: '#ea5e5e !important',
                }}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleSignout()
                }}
              >
                <Icon type="logout" />
                <span>Sign out</span>
              </a>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    </Affix>
  )
}

export default Header
