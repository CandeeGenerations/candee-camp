/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Icon, Layout, Menu} from 'antd'
import {useRoute} from 'react-router5'

import {NavItem} from '@/components/Navigation'

const NavBarContent = props => {
  const routerContext = useRoute()
  const routeName = routerContext.route.name

  return (
    <Layout.Sider collapsed>
      <Menu
        css={{
          height: '100%',
          position: 'fixed',
        }}
        selectedKeys={props.selectedItem ? [props.selectedItem.routeName] : []}
        theme="dark"
      >
        <Menu.Item
          css={{
            a: {
              fontSize: 21,
              fontWeight: 700,
              marginLeft: -8,
              textTransform: 'uppercase',
              color: '#f3f3f4 !important',
              fontFamily: "'Comfortaa', sans-serif",

              '&:focus, &:active': {
                textDecoration: 'none',
              },
            },
          }}
          title="Dashboard"
        >
          <NavItem options={{reload: true}} routeName="dashboard">
            CC
          </NavItem>
        </Menu.Item>
      </Menu>

      <Menu
        css={{position: 'fixed', top: '50%', marginTop: -190}}
        selectedKeys={[routeName]}
        theme="dark"
      >
        {props.navItems.map(item => (
          <Menu.Item
            key={item.routeName}
            css={{
              '&.ant-menu-item-selected > a': {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: '#f0f2f5 !important',
              },
            }}
          >
            <NavItem options={{reload: true}} routeName={item.routeName}>
              <Icon type={item.icon} />

              <span>{item.name}</span>

              {routeName === item.routeName && (
                <div
                  className="navbar-extra"
                  css={css`
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 20px;
                    position: absolute;
                    background-color: #f0f2f5;

                    &:after {
                      top: -9px;
                      width: 22px;
                      content: '';
                      height: 19px;
                      position: absolute;
                      background-color: #2a363e;
                      border-bottom-right-radius: 20px;
                    }
                  `}
                >
                  <div
                    css={css`
                      &:after {
                        bottom: -9px;
                        width: 22px;
                        content: '';
                        height: 19px;
                        position: absolute;
                        background-color: #2a363e;
                        border-top-right-radius: 20px;
                      }
                    `}
                  />
                </div>
              )}
            </NavItem>
          </Menu.Item>
        ))}
      </Menu>

      <Menu
        css={{
          bottom: 10,
          position: 'fixed !important',
        }}
        theme="dark"
      >
        <Menu.Item>
          <a
            css={{
              color: '#ea5e5e !important',
            }}
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

export default NavBarContent
