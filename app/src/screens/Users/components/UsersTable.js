import React from 'react'
import {Divider, Table} from 'antd'

import {Constants} from '../../../helpers/constants'
import {formatDate, formatRole} from '../../../helpers'

import {NavItem} from '../../../components/Navigation'
import loader from '../../../components/Structure/Loader'

type Props = {
  users: [
    {
      createdDate: number,
      firstName: string,
      id: number,
      key: number,
      lastLoggedInDate?: number,
      lastName: string,
      role: number,
      updatedDate: number,
    },
  ],
  loader: {
    spinning: boolean,
  },
}

const {Column} = Table

const UsersTable = (props: Props) => {
  return props.loader.spinning ? (
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
}

export default loader(UsersTable)
