import React from 'react'
import {Icon, Layout, Menu, Spin} from 'antd'

import {NavItem} from '../../Navigation'

import './navBarContent.scss'

const {Header} = Layout
const {ItemGroup, SubMenu} = Menu

type Props = {
  loading: {
    signout: boolean,
  },
  navItems: [
    {
      name: string,
      routeName: string,
    },
  ],
  selectedItem?: {
    name: string,
    routeName: string,
  },

  // functions
  onSignout: () => void,
}

export default (props: Props = {selectedItem: null}) => {
  return (
    <Header className="cc--navbar--header">
      <div className="cc--logo">
        <NavItem options={{reload: true}} routeName="dashboard">
          Candee Camp
        </NavItem>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={props.selectedItem ? [props.selectedItem.routeName] : []}
        theme="dark"
      >
        {props.navItems.map(item => (
          <Menu.Item key={item.routeName} className="cc--menu-item--text">
            <NavItem options={{reload: true}} routeName={item.routeName}>
              {item.name}
            </NavItem>
          </Menu.Item>
        ))}

        <SubMenu
          className="cc--menu-item--right cc--menu-item--icon"
          title={<i className="icon ion-md-contact" />}
        >
          <ItemGroup title="Username">
            <Menu.Item className="cc--sign-out" onClick={props.onSignout}>
              {props.loading.signout ? (
                <Spin
                  indicator={
                    <Icon style={{fontSize: 18}} type="loading" spin />
                  }
                />
              ) : (
                <span>Sign out</span>
              )}
            </Menu.Item>
          </ItemGroup>
        </SubMenu>
      </Menu>
    </Header>
  )
}
