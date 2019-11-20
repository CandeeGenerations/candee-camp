/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive} from '@/helpers'

import {NavItem} from '@/components/Navigation'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const UsersTable = props =>
  props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : (
    <Table
      dataSource={props.users}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="firstName" dataIndex="firstName" title="First Name" />

      <Column key="lastName" dataIndex="lastName" title="Last Name" />

      <Column
        key="emailAddress"
        dataIndex="emailAddress"
        title="Email Address"
      />

      <Column
        key="isActive"
        align="center"
        dataIndex="isActive"
        render={formatIsActive}
        title="Is Active"
      />

      {/* <Column key="role" dataIndex="role" render={formatRole} title="Role" /> */}

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
        key="lastLoggedInDate"
        align="right"
        dataIndex="lastLoggedInDate"
        render={formatDate}
        title="Last Logged In Date"
      />

      <Column
        key="action"
        align="right"
        render={(text, record) => (
          <span>
            <NavItem params={{userId: record.id}} routeName="users.edit">
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this user?
                </p>
              }
              onConfirm={() => props.deleteUser(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      key: PropTypes.number.isRequired,
      lastLoggedInDate: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      role: PropTypes.string,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  deleteUser: PropTypes.func.isRequired,
}

export default loader(UsersTable)
