/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'
import {Popover, Table, Menu, Dropdown, Icon} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive, formatCurrency} from '@/helpers'

import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const CampersTable = (props) => {
  const page = usePage()
  const router = useRouter()
  const [actionsMenu, setActionMenu] = useState({id: null, visible: false})

  const clickActionItem = (e, camperId) => {
    if (e.key !== 'delete') {
      setActionMenu({id: null, visible: false})

      switch (e.key) {
        case 'edit':
          router.navigate(page.camperEditPage, {camperId})
          break

        case 'snackShop':
          router.navigate(page.camperSnackShopPage, {camperId})
          break

        default:
          break
      }
    }
  }

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.campers.length === 0 ? (
    <EmptyState title="Camper" onCreateNew={props.onCreateCamper} />
  ) : (
    <Table
      dataSource={props.campers}
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
        key="birthDate"
        align="right"
        dataIndex="birthDate"
        render={formatDate}
        title="Birthdate"
      />

      <Column
        key="parentName"
        render={(text, record) =>
          record.parentFirstName && record.parentLastName ? (
            `${record.parentFirstName} ${record.parentLastName}`
          ) : (
            <em>None</em>
          )
        }
        title="Parent's Name"
      />

      <Column
        key="medicine"
        align="center"
        dataIndex="medicine"
        render={(medicine) => (
          <Popover
            content={
              medicine ? (
                <ul>
                  {medicine.split(',').map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              ) : (
                <em>None</em>
              )
            }
            title="Medication"
          >
            {formatIsActive(medicine)}
          </Popover>
        )}
        title="Has Medication"
      />

      <Column
        key="allergies"
        align="center"
        dataIndex="allergies"
        render={(allergies) => (
          <Popover
            content={
              allergies ? (
                <ul>
                  {allergies.split(',').map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              ) : (
                <em>None</em>
              )
            }
            title="Allergies"
          >
            {formatIsActive(allergies)}
          </Popover>
        )}
        title="Has Allergies"
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
            <Menu onClick={(e) => clickActionItem(e, record.id)}>
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
                      to delete this camper?
                    </p>
                  }
                  onConfirm={async () => {
                    await props.deleteCamper(record.id)
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
              onVisibleChange={(flag) =>
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

CampersTable.propTypes = {
  campers: PropTypes.arrayOf(
    PropTypes.shape({
      allergies: PropTypes.string,
      birthDate: PropTypes.string,
      createdDate: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      key: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      medicine: PropTypes.string,
      parentFirstName: PropTypes.string,
      parentLastName: PropTypes.string,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  deleteCamper: PropTypes.func.isRequired,
  onCreateCamper: PropTypes.func.isRequired,
}

export default loader(CampersTable)
