/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Popover, Table} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive} from '@/helpers'

import {NavItem} from '@/components/Navigation'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const CampersTable = props => {
  const page = usePage()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
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
        render={medicine => (
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
        render={allergies => (
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
        render={(text, record) => (
          <span>
            <NavItem
              params={{camperId: record.id}}
              routeName={page.camperEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this camper?
                </p>
              }
              onConfirm={() => props.deleteCamper(record.id)}
            />
          </span>
        )}
        title="Actions"
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
}

export default loader(CampersTable)
