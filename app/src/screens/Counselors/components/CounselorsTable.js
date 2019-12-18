/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'
import {Table, Menu, Icon, Dropdown} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive, formatCurrency} from '@/helpers'

import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const CounselorsTable = props => {
  const page = usePage()
  const router = useRouter()
  const [actionsMenu, setActionMenu] = useState({id: null, visible: false})

  const clickActionItem = (e, counselorId) => {
    if (e.key !== 'delete') {
      setActionMenu({id: null, visible: false})

      switch (e.key) {
        case 'edit':
          router.navigate(page.counselorEditPage, {counselorId})
          break

        case 'snackShop':
          router.navigate(page.counselorSnackShopPage, {counselorId})
          break

        default:
          break
      }
    }
  }

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : (
    <Table
      dataSource={props.counselors}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="firstName" dataIndex="firstName" title="First Name" />

      <Column key="lastName" dataIndex="lastName" title="Last Name" />

      <Column
        key="isActive"
        align="center"
        dataIndex="isActive"
        render={formatIsActive}
        title="Is Active"
      />

      <Column
        key="startingBalance"
        align="right"
        dataIndex="startingBalance"
        render={formatCurrency}
        title="Starting Balance"
      />

      <Column
        key="createdDate"
        align="right"
        dataIndex="createdDate"
        render={formatDate}
        title="Created Date"
      />

      <Column
        key="updatedDate"
        align="right"
        dataIndex="updatedDate"
        render={formatDate}
        title="Updated Date"
      />

      <Column
        key="action"
        align="right"
        render={(text, record) => {
          const menu = (
            <Menu onClick={e => clickActionItem(e, record.id)}>
              <Menu.Item key="snackShop" align="right">
                Snack Shop
              </Menu.Item>

              <Menu.Item key="edit" align="right">
                Edit
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item key="delete" align="right">
                <DeleteLink
                  style={{color: 'red'}}
                  title={
                    <p>
                      Are you sure you want
                      <br />
                      to delete this counselor?
                    </p>
                  }
                  onConfirm={async () => {
                    await props.deleteCounselor(record.id)
                    setActionMenu(false)
                  }}
                />
              </Menu.Item>
            </Menu>
          )

          return (
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              trigger={['click']}
              visible={actionsMenu.id === record.id && actionsMenu.visible}
              onVisibleChange={flag =>
                setActionMenu({id: record.id, visible: flag})
              }
            >
              <a href="#">
                Actions <Icon type="down" />
              </a>
            </Dropdown>
          )
        }}
      />
    </Table>
  )
}

CounselorsTable.propTypes = {
  counselors: PropTypes.arrayOf(
    PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      key: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      startingBalance: PropTypes.number.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // function
  deleteCounselor: PropTypes.func.isRequired,
}

export default loader(CounselorsTable)
