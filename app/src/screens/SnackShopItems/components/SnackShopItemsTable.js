/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatIsActive, formatCurrency} from '@/helpers'

import {NavItem} from '@/components/Navigation'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const SnackShopItemsTable = (props) => {
  const page = usePage()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.snackShopItems.length === 0 ? (
    <EmptyState
      title="Snack Shop Item"
      onCreateNew={props.onCreateSnackShopItem}
    />
  ) : (
    <Table
      dataSource={props.snackShopItems}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="name" dataIndex="name" title="Name" />

      <Column
        key="barcode"
        dataIndex="barcode"
        render={(value) => value || <em>None</em>}
        title="Barcode"
      />

      <Column
        key="isActive"
        align="center"
        dataIndex="isActive"
        render={formatIsActive}
        title="Is Active"
      />

      <Column
        key="price"
        align="right"
        dataIndex="price"
        render={formatCurrency}
        title="Price"
      />

      <Column
        key="amountAvailable"
        align="right"
        dataIndex="amountAvailable"
        title="Amount Available"
      />

      <Column
        key="action"
        align="right"
        render={(text, record) => (
          <span>
            <NavItem
              params={{snackShopItemId: record.id}}
              routeName={page.snackShopItemEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this snack shop item?
                </p>
              }
              onConfirm={() => props.deleteSnackShopItem(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

SnackShopItemsTable.propTypes = {
  snackShopItems: PropTypes.arrayOf(
    PropTypes.shape({
      amountAvailable: PropTypes.number.isRequired,
      barcode: PropTypes.string,
      createdDate: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // function
  deleteSnackShopItem: PropTypes.func.isRequired,
  onCreateSnackShopItem: PropTypes.func.isRequired,
}

export default loader(SnackShopItemsTable)
