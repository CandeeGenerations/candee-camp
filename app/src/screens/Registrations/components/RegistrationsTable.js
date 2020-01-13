/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'
import {Table, Divider, Tag, Icon} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive} from '@/helpers'

import {NavItem} from '@/components/Navigation'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const RegistrationsTable = props => {
  const page = usePage()
  const router = useRouter()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.registrations.length === 0 ? (
    <EmptyState title="Registration" onCreateNew={props.onCreateRegistration} />
  ) : (
    <Table
      dataSource={props.registrations}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column
        key="eventId"
        dataIndex="eventId"
        render={eventId => {
          let event = null

          if (!props.events.loading && props.events.results) {
            event = props.events.results.find(e => e.id === eventId)
          }

          return props.events.loading ? (
            <Icon type="loading" />
          ) : event ? (
            <Tag
              color="blue"
              css={{cursor: 'pointer'}}
              onClick={() =>
                router.navigate(
                  page.registrationEventEditPage,
                  {eventId: event.id},
                  {},
                )
              }
            >
              {event.name}
            </Tag>
          ) : (
            <em>None</em>
          )
        }}
        title="Event"
      />

      <Column
        key="camperId"
        dataIndex="camperId"
        render={camperId => {
          let camper = null

          if (!props.campers.loading && props.campers.results) {
            camper = props.campers.results.find(c => c.id === camperId)
          }

          return props.campers.loading ? (
            <Icon type="loading" />
          ) : camper ? (
            <Tag
              color="blue"
              css={{cursor: 'pointer'}}
              onClick={() =>
                router.navigate(
                  page.registrationCamperEditPage,
                  {camperId: camper.id},
                  {},
                )
              }
            >
              {camper.firstName} {camper.lastName}
            </Tag>
          ) : (
            <em>None</em>
          )
        }}
        title="Camper"
      />

      <Column
        key="isActive"
        align="center"
        dataIndex="isActive"
        render={formatIsActive}
        title="Is Active"
      />

      <Column
        key="registrationDate"
        align="right"
        dataIndex="registrationDate"
        render={formatDate}
        title="Registration Date"
      />

      <Column
        key="checkInDate"
        align="right"
        dataIndex="checkInDate"
        render={date => formatDate(date, false)}
        title="Check In Date"
      />

      <Column
        key="checkOutDate"
        align="right"
        dataIndex="checkOutDate"
        render={date => formatDate(date, false)}
        title="Check Out Date"
      />

      <Column
        key="action"
        align="right"
        render={(text, record) => (
          <span>
            <NavItem
              params={{registrationId: record.id}}
              routeName={page.registrationEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this registration?
                </p>
              }
              onConfirm={() => props.deleteRegistration(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

RegistrationsTable.propTypes = {
  events: PropTypes.shape().isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  registrations: PropTypes.arrayOf(
    PropTypes.shape({
      camperId: PropTypes.number.isRequired,
      checkInDate: PropTypes.string,
      checkOutDate: PropTypes.string,
      eventId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      key: PropTypes.number.isRequired,
      registrationDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  users: PropTypes.shape().isRequired,

  // functions
  deleteRegistration: PropTypes.func.isRequired,
  onCreateRegistration: PropTypes.func.isRequired,
}

export default loader(RegistrationsTable)
