/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import React, {useContext, useState, useEffect} from 'react'
import {
  Button,
  Col,
  Row,
  Input,
  InputNumber,
  Dropdown,
  Icon,
  Menu,
  Typography,
} from 'antd'

import {
  inputNumberFormatter,
  inputNumberParser,
  inputPercentFormatter,
  inputPercentParser,
} from '@/helpers'

import {FiltersContext} from '@/screens/App'
import Filters from '@/components/Structure/Filters'

const CouponFilters = (props) => {
  const {
    couponFilters: {filters, setFilters, resetFilters},
  } = useContext(FiltersContext)

  const [amountError, setAmountError] = useState(false)

  useEffect(() => {
    if (filters.applyFilters) {
      props.onApplyFilters()
      setFilters({...filters, applyFilters: false})
    }
  }, [filters])

  const handleApplyFilters = () => {
    if (!amountError) {
      setFilters({...filters, applyFilters: true})
    }
  }

  const handleResetFilters = () => {
    setAmountError(false)
    resetFilters()
  }

  return (
    <Filters>
      <Row css={{marginBottom: 15}}>
        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Name</strong>
            <br />
            <em>Search by name</em>
          </p>

          <Input
            placeholder="Name"
            value={filters.name}
            allowClear
            onChange={(e) => setFilters({...filters, name: e.target.value})}
          />
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Is active</strong>
            <br />
            <em>Filter by active coupons</em>
          </p>

          <Dropdown
            overlay={
              <Menu
                selectedKeys={[filters.isActive]}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    isActive: e.key,
                  })
                }
              >
                <Menu.Item key="all">All coupons</Menu.Item>
                <Menu.Item key="true">Active coupons</Menu.Item>
                <Menu.Item key="false">Inactive coupons</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.isActive === 'all'
                ? 'All coupons'
                : filters.isActive === 'true'
                ? 'Active coupons'
                : 'Inactive coupons'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Amount</strong>
            <br />
            <em>Filter by amount</em>
          </p>

          <InputNumber
            disabled={filters.amountType === 'all'}
            formatter={
              filters.amountType === 'percent'
                ? inputPercentFormatter
                : inputNumberFormatter
            }
            min={0}
            parser={
              filters.amountType === 'percent'
                ? inputPercentParser
                : inputNumberParser
            }
            step={0.01}
            value={filters.amountStart}
            onBlur={() =>
              setAmountError(filters.amountEnd < filters.amountStart)
            }
            onChange={(value) => setFilters({...filters, amountStart: value})}
          />

          <div css={{display: 'inline', margin: '0 5px'}}>-</div>

          <InputNumber
            disabled={filters.amountType === 'all'}
            formatter={
              filters.amountType === 'percent'
                ? inputPercentFormatter
                : inputNumberFormatter
            }
            min={0}
            parser={
              filters.amountType === 'percent'
                ? inputPercentParser
                : inputNumberParser
            }
            step={0.01}
            value={filters.amountEnd}
            onBlur={() =>
              setAmountError(filters.amountEnd < filters.amountStart)
            }
            onChange={(value) => setFilters({...filters, amountEnd: value})}
          />

          <p css={{marginBottom: 0}}>
            <small>
              <Typography.Text type="muted">
                Must select a type to filter by amount
              </Typography.Text>
            </small>
          </p>

          {amountError && (
            <p css={{marginBottom: 0}}>
              <small>
                <Typography.Text type="danger">
                  The start amount must be less than the end amount.
                </Typography.Text>
              </small>
            </p>
          )}
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Type</strong>
            <br />
            <em>Filter by type</em>
          </p>

          <Dropdown
            overlay={
              <Menu
                selectedKeys={[filters.amountType]}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    amountType: e.key,
                  })
                }
              >
                <Menu.Item key="all">All coupons</Menu.Item>
                <Menu.Item key="dollar">Dollar coupons</Menu.Item>
                <Menu.Item key="percent">Percent coupons</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.amountType === 'all'
                ? 'All coupons'
                : filters.amountType === 'dollar'
                ? 'Dollar coupons'
                : 'Percent coupons'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Code</strong>
            <br />
            <em>Search by code</em>
          </p>

          <Input
            placeholder="Code"
            value={filters.code}
            allowClear
            onChange={(e) => setFilters({...filters, code: e.target.value})}
          />
        </Col>
      </Row>

      <Row>
        <Col
          css={{textAlign: 'right', marginTop: 25, paddingRight: 15}}
          span={24}
        >
          <Button css={{marginRight: 5}} onClick={handleResetFilters}>
            Reset
          </Button>

          <Button type="primary" onClick={() => handleApplyFilters(false)}>
            Apply
          </Button>
        </Col>
      </Row>
    </Filters>
  )
}

CouponFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default CouponFilters
