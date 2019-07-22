import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'
import {Divider, Icon, Table, Tag} from 'antd'

import {formatDate} from '@/helpers'
import {Constants} from '@/helpers/constants'

import {NavItem} from '@/components/Navigation'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const EventsTable = props => {
  const router = useRouter()

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
          record.endDate > dayjs().valueOf() ? (
            <Icon theme="twoTone" twoToneColor="#52c41a" type="check-circle" />
          ) : (
            <Icon theme="twoTone" twoToneColor="#eb2f96" type="close-circle" />
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
        render={userId => {
          let user = null

          if (!props.users.loading && props.users.results) {
            user = props.users.results.find(u => u.id === userId)
          }

          return props.users.loading ? (
            <Icon type="loading" />
          ) : user ? (
            <Tag
              className="cc--clickable"
              color="blue"
              onClick={() =>
                router.navigate('events.user', {userId: user.id}, {})
              }
            >
              {user.firstName} {user.lastName}
            </Tag>
          ) : (
            <em>None</em>
          )
        }}
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

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this item?
                </p>
              }
              onConfirm={() => props.deleteEvent(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

EventsTable.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      createdBy: PropTypes.number.isRequired,
      createdDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  users: PropTypes.shape().isRequired,

  // functions
  deleteEvent: PropTypes.func.isRequired,
}

export default loader(EventsTable)
