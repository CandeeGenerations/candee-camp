import React from 'react'
import dayjs from 'dayjs'
import {Divider, Table, Tag} from 'antd'

import {Constants} from '../../../helpers/constants'

import {NavItem} from '../../../components/Navigation'
import loader from '../../../components/Structure/Loader'

type Props = {
  events: [
    {
      createdBy: string,
      createdDate: number,
      endDate: number,
      key: number,
      id: number,
      name: string,
      startDate: number,
    },
  ],
  loader: {
    spinning: boolean,
  },
}

const {Column} = Table
const formatDate = date => dayjs(date).format('ddd, MMM D, YYYY')

const EventsTable = (props: Props) => {
  return props.loader.spinning ? (
    <div style={{minHeight: 500}} />
  ) : (
    <Table
      dataSource={props.events}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="name" dataIndex="name" title="Name" />

      <Column
        key="onGoing"
        align="center"
        render={(text, record) =>
          record.startDate < dayjs().valueOf() &&
          record.endDate > dayjs().valueOf() && (
            <i
              className="icon ion-md-checkmark-circle-outline"
              style={{fontSize: 15, color: 'green'}}
            />
          )
        }
        title="On Going"
      />

      <Column
        key="startDate"
        align="right"
        dataIndex="startDate"
        render={formatDate}
        title="Start Date"
      />

      <Column
        key="endDate"
        align="right"
        dataIndex="endDate"
        render={formatDate}
        title="End Date"
      />

      <Column
        key="createdBy"
        dataIndex="createdBy"
        render={name => <Tag color="blue">{name}</Tag>}
        title="Created By"
      />

      <Column
        key="createdDate"
        align="right"
        dataIndex="createdDate"
        render={formatDate}
        title="Created Date"
      />

      <Column
        key="action"
        align="right"
        render={(text, record) => (
          <span>
            <NavItem params={{eventId: record.id}} routeName="events.edit">
              Edit
            </NavItem>

            <Divider type="vertical" />

            <NavItem params={{eventId: record.id}} routeName="events.delete">
              Delete
            </NavItem>
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

export default loader(EventsTable)
