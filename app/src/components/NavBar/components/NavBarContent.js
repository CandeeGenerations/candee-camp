/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useState} from 'react'
import PropTypes from 'prop-types'
import {Icon, Layout, Menu} from 'antd'

import {NavItem} from '@/components/Navigation'

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
        css={{height: '100%', position: 'fixed'}}
        selectedKeys={props.selectedItem ? [props.selectedItem.routeName] : []}
        theme="dark"
      >
        <Menu.Item
          css={css`
            a {
              font-size: 21px;
              font-weight: 700;
              margin-left: -8px;
              text-transform: uppercase;
              color: #f3f3f4 !important;
              font-family: 'Comfortaa', sans-serif;

              &:focus,
              &:active {
                text-decoration: none;
              }
            }
          `}
          title="Dashboard"
        >
          <NavItem options={{reload: true}} routeName="dashboard">
            {collapsed ? 'CC' : 'Candee Camp'}
          </NavItem>
        </Menu.Item>

        {props.navItems.map(item => (
          <Menu.Item key={item.routeName}>
            <NavItem options={{reload: true}} routeName={item.routeName}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </NavItem>
          </Menu.Item>
        ))}

        <Menu.Item
          css={`
            bottom: 50px;
            position: fixed;

            a {
              color: #ea5e5e !important;
            }
          `}
        >
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
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

NavBarContent.defaultProps = {
  selectedItem: null,
}

NavBarContent.propTypes = {
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
