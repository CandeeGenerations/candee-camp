import React from 'react'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import {Constants} from '../../../helpers/constants'
import {formatDate, formatRole} from '../../../helpers'

import {NavItem} from '../../../components/Navigation'
import loader from '../../../components/Structure/Loader'

const {Column} = Table

const UsersTable = props =>
  props.loader.spinning ? (
    <div style={{minHeight: 500}} />
  ) : (
    <Table
      dataSource={props.users}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="firstName" dataIndex="firstName" title="First Name" />

      <Column key="lastName" dataIndex="lastName" title="Last Name" />

      <Column key="role" dataIndex="role" render={formatRole} title="Role" />

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

            <NavItem params={{userId: record.id}} routeName="users.delete">
              Delete
            </NavItem>
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
}

export default loader(UsersTable)
