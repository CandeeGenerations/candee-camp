/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {Menu, Layout, Affix} from 'antd'

import {NavItem} from '@/components/Navigation'

import logo from '../../content/images/logo-long-color.png'

const Header = () => {
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
        </Menu>
      </Layout.Header>
    </Affix>
  )
}

export default Header
