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

const CustomFieldsTable = (props) => {
  const page = usePage()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.customFields.length === 0 ? (
    <EmptyState title="Custom Fields" onCreateNew={props.onCreateCustomField} />
  ) : (
    <Table
      dataSource={props.customFields}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="name" dataIndex="name" title="Name" />

      <Column key="fieldType" dataIndex="fieldType" title="Field Type" />

      <Column
        key="required"
        align="center"
        dataIndex="required"
        render={formatIsActive}
        title="Required Field"
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
              params={{customFieldId: record.id}}
              routeName={page.customFieldEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this custom field?
                </p>
              }
              onConfirm={() => props.deleteCustomField(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

CustomFieldsTable.propTypes = {
  customFields: PropTypes.arrayOf(
    PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      fieldType: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // function
  deleteCustomField: PropTypes.func.isRequired,
  onCreateCustomField: PropTypes.func.isRequired,
}

export default loader(CustomFieldsTable)
