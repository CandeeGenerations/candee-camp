import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Icon, Layout, Menu, Spin} from 'antd'

import {NavItem} from '../../Navigation'

import './navBarContent.scss'

const lsEntry = 'cc--nav-collapsed'

const NavBarContent = props => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem(lsEntry) === 'true',
  )

  const handleCollapse = col => {
    localStorage.setItem(lsEntry, col)
    setCollapsed(col)
  }

  return (
    <Layout.Sider collapsed={collapsed} collapsible onCollapse={handleCollapse}>
      <Menu
        className="cc--menu-list"
        selectedKeys={props.selectedItem ? [props.selectedItem.routeName] : []}
        theme="dark"
      >
        <Menu.Item className="cc--logo" title="Dashboard">
          <NavItem options={{reload: true}} routeName="dashboard">
            {collapsed ? 'CC' : 'Candee Camp'}
          </NavItem>
        </Menu.Item>

        {props.navItems.map(item => (
          <Menu.Item key={item.routeName} className="cc--menu-item--text">
            <NavItem options={{reload: true}} routeName={item.routeName}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </NavItem>
          </Menu.Item>
        ))}

        <Menu.Item className="cc--bottom-item cc--sign-out">
          {props.loading ? (
            <Spin
              indicator={<Icon style={{fontSize: 18}} type="loading" spin />}
            />
          ) : (
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                props.onSignout()
              }}
            >
              <Icon type="logout" />
              <span>Sign out</span>
            </a>
          )}
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

NavBarContent.defaultProps = {
  selectedItem: null,
}

NavBarContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    routeName: PropTypes.string.isRequired,
  }),

  // functions
  onSignout: PropTypes.func.isRequired,
}

export default NavBarContent
