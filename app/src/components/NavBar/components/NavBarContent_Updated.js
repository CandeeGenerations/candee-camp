/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'
import {Layout, Menu, Icon, Affix} from 'antd'

import {NavItem} from '@/components/Navigation'

const NavBarContentUpdated = (props) => {
  const routerContext = useRoute()
  const routeName = routerContext.route.name
  const openKey = props.navItems.find((item) =>
    routeName.includes(item.routeName),
  )

  return (
    <Affix
      css={{borderRight: '1px solid #e8e8e8', background: '#fff'}}
      offsetTop={68}
    >
      <Layout.Sider>
        <Menu
          css={{borderRight: 0}}
          defaultOpenKeys={openKey ? [openKey.routeName] : []}
          mode="inline"
          selectedKeys={[routeName]}
        >
          {props.navItems.map((item) => {
            if (!item.subItems) {
              return (
                <Menu.Item key={item.routeName}>
                  <NavItem options={{reload: true}} routeName={item.routeName}>
                    <Icon type={item.icon} />

                    <span>{item.name}</span>
                  </NavItem>
                </Menu.Item>
              )
            }

            return (
              <Menu.SubMenu
                key={item.routeName}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {item.subItems.map((subItem) => (
                  <Menu.Item key={subItem.routeName}>
                    <NavItem
                      options={{reload: true}}
                      routeName={subItem.routeName}
                    >
                      {subItem.name}
                    </NavItem>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          })}
        </Menu>
      </Layout.Sider>
    </Affix>
  )
}

NavBarContentUpdated.defaultProps = {
  selectedItem: null,
}

NavBarContentUpdated.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedItem: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    routeName: PropTypes.string.isRequired,
  }),

  // functions
  onSignout: PropTypes.func.isRequired,
}

export default NavBarContentUpdated
