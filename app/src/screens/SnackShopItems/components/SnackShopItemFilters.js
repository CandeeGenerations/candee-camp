/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import React, {useContext, useEffect, useState} from 'react'
import {
  Button,
  Col,
  Row,
  Input,
  Dropdown,
  Icon,
  Menu,
  InputNumber,
  Typography,
} from 'antd'

import {FiltersContext} from '@/screens/App'
import Filters from '@/components/Structure/Filters'
import {inputNumberFormatter, inputNumberParser} from '@/helpers'

const SnackShopItemFilters = (props) => {
  const {
    snackShopItemFilters: {filters, setFilters, resetFilters},
  } = useContext(FiltersContext)

  const [priceError, setPriceError] = useState(false)
  const [amountAvailableError, setAmountAvailableError] = useState(false)

  useEffect(() => {
    if (filters.applyFilters) {
      props.onApplyFilters()
      setFilters({...filters, applyFilters: false})
    }
  }, [filters])

  const handleApplyFilters = () => {
    if (!priceError && !amountAvailableError) {
      setFilters({...filters, applyFilters: true})
    }
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
            <strong>Barcode</strong>
            <br />
            <em>Search by barcode</em>
          </p>

          <Input
            placeholder="Barcode"
            value={filters.barcode}
            allowClear
            onChange={(e) => setFilters({...filters, barcode: e.target.value})}
          />
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Is Active</strong>
            <br />
            <em>Filter by active cabins</em>
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
                <Menu.Item key="all">All items</Menu.Item>
                <Menu.Item key="true">Active items</Menu.Item>
                <Menu.Item key="false">Inactive items</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.isActive === 'all'
                ? 'All items'
                : filters.isActive === 'true'
                ? 'Active items'
                : 'Inactive items'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Price</strong>
            <br />
            <em>Filter by price</em>
          </p>

          <InputNumber
            formatter={inputNumberFormatter}
            min={0}
            parser={inputNumberParser}
            step={0.01}
            value={filters.priceStart}
            onBlur={() => setPriceError(filters.priceEnd < filters.priceStart)}
            onChange={(value) => setFilters({...filters, priceStart: value})}
          />

          <div css={{display: 'inline', margin: '0 5px'}}>-</div>

          <InputNumber
            formatter={inputNumberFormatter}
            min={0}
            parser={inputNumberParser}
            step={0.01}
            value={filters.priceEnd}
            onBlur={() => setPriceError(filters.priceEnd < filters.priceStart)}
            onChange={(value) => setFilters({...filters, priceEnd: value})}
          />

          {priceError && (
            <p css={{marginBottom: 0}}>
              <small>
                <Typography.Text type="danger">
                  The start price must be less than the end price.
                </Typography.Text>
              </small>
            </p>
          )}
        </Col>
      </Row>

      <Row>
        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Amount available</strong>
            <br />
            <em>Filter by amount available</em>
          </p>

          <InputNumber
            min={0}
            step={1}
            value={filters.amountAvailableStart}
            onBlur={() =>
              setAmountAvailableError(
                filters.amountAvailableEnd < filters.amountAvailableStart,
              )
            }
            onChange={(value) =>
              setFilters({...filters, amountAvailableStart: value})
            }
          />

          <div css={{display: 'inline', margin: '0 5px'}}>-</div>

          <InputNumber
            min={0}
            step={1}
            value={filters.amountAvailableEnd}
            onBlur={() =>
              setAmountAvailableError(
                filters.amountAvailableEnd < filters.amountAvailableStart,
              )
            }
            onChange={(value) =>
              setFilters({...filters, amountAvailableEnd: value})
            }
          />

          {amountAvailableError && (
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
            <strong>Has barcode</strong>
            <br />
            <em>Filter items with or without barcodes</em>
          </p>

          <Dropdown
            overlay={
              <Menu
                selectedKeys={[filters.hasBarcode]}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    hasBarcode: e.key,
                  })
                }
              >
                <Menu.Item key="all">All items</Menu.Item>
                <Menu.Item key="true">Items with barcode</Menu.Item>
                <Menu.Item key="false">Items without barcode</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.hasBarcode === 'all'
                ? 'All items'
                : filters.hasBarcode === 'true'
                ? 'Items with barcode'
                : 'Items without barcode'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <Col
          css={{textAlign: 'right', marginTop: 25, paddingRight: 15}}
          span={24}
        >
          <Button css={{marginRight: 5}} onClick={resetFilters}>
            Reset
          </Button>

          <Button type="primary" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Col>
      </Row>
    </Filters>
  )
}

SnackShopItemFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default SnackShopItemFilters
