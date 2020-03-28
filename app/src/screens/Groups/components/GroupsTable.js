/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatDate, formatIsActive} from '@/helpers'

import {NavItem} from '@/components/Navigation'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const GroupsTable = (props) => {
  const page = usePage()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.groups.length === 0 ? (
    <EmptyState title="Group" onCreateNew={props.onCreateGroup} />
  ) : (
    <Table
      dataSource={props.groups}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="name" dataIndex="name" title="Name" />

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
              params={{groupId: record.id}}
              routeName={page.groupEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this group?
                </p>
              }
              onConfirm={() => props.deleteGroup(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

GroupsTable.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  deleteGroup: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
}

export default loader(GroupsTable)
