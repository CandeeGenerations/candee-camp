/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {
  formatDate,
  formatIsActive,
  formatCurrency,
  formatPercent,
} from '@/helpers'

import CodeCopy from '@/components/CodeCopy'
import {NavItem} from '@/components/Navigation'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

const CouponsTable = (props) => {
  const page = usePage()

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.coupons.length === 0 ? (
    <EmptyState title="Coupon" onCreateNew={props.onCreateCoupon} />
  ) : (
    <Table
      dataSource={props.coupons}
      pagination={Constants.TableOptions.PaginationOptions}
    >
      <Column key="name" dataIndex="name" title="Name" />

      <Column
        key="code"
        dataIndex="code"
        render={(text) => <CodeCopy>{text}</CodeCopy>}
        title="Code"
      />

      <Column
        key="amount"
        align="right"
        dataIndex="amount"
        render={(amount, record) =>
          record.type === 'Percent'
            ? formatPercent(amount)
            : formatCurrency(amount)
        }
        title="Amount"
      />

      <Column
        key="expirationDate"
        align="right"
        dataIndex="expirationDate"
        render={(date) => formatDate(date, false)}
        title="Expiration Date"
      />

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
              params={{couponId: record.id}}
              routeName={page.couponEditPage}
            >
              Edit
            </NavItem>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this coupon?
                </p>
              }
              onConfirm={() => props.deleteCoupon(record.id)}
            />
          </span>
        )}
        title="Actions"
      />
    </Table>
  )
}

CouponsTable.propTypes = {
  coupons: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      expirationDate: PropTypes.string,
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
  deleteCoupon: PropTypes.func.isRequired,
  onCreateCoupon: PropTypes.func.isRequired,
}

export default loader(CouponsTable)
