import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import {Divider, Table, Tag} from 'antd'

import {Constants} from '../../../helpers/constants'

import {NavItem} from '../../../components/Navigation'
import loader from '../../../components/Structure/Loader'

const {Column} = Table
const formatDate = date => dayjs(date).format('ddd, MMM D, YYYY')

const EventsTable = props => {
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

EventsTable.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      createdBy: PropTypes.string.isRequired,
      createdDate: PropTypes.number.isRequired,
      endDate: PropTypes.number.isRequired,
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      startDate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
}

export default loader(EventsTable)
