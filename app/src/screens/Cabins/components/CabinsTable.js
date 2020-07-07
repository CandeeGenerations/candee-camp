/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import {formatIsActive} from '@/helpers'
import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'

import {NavItem} from '@/components/Navigation'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const CabinsTable = (props) => {
  const page = usePage()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.cabins.length === 0 ? (
    <EmptyState title="Cabin" onCreateNew={props.onCreateCabin} />
  ) : (
    <Table
      dataSource={props.cabins}
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
        key="action"
        align="right"
        render={(text, record) => (
          <span>
            <NavItem
              params={{cabinId: record.id}}
              routeName={page.cabinEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this cabin?
                </p>
              }
              onConfirm={() => props.deleteCabin(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

CabinsTable.propTypes = {
  cabins: PropTypes.arrayOf(
    PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // function
  deleteCabin: PropTypes.func.isRequired,
  onCreateCabin: PropTypes.func.isRequired,
}

export default loader(CabinsTable)
