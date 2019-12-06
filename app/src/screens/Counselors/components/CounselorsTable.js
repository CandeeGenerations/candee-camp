/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive, formatCurrency} from '@/helpers'

import {NavItem} from '@/components/Navigation'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const CounselorsTable = props => {
  const page = usePage()

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
        key="startingBalance"
        align="right"
        dataIndex="startingBalance"
        render={formatCurrency}
        title="Starting Balance"
      />

      <Column
        key="isActive"
        align="center"
        dataIndex="isActive"
        render={formatIsActive}
        title="Is Active"
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
              params={{counselorId: record.id}}
              routeName={page.counselorEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this counselor?
                </p>
              }
              onConfirm={() => props.deleteCounselor(record.id)}
            />
          </span>
        )}
        title="Actions"
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
