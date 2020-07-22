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

import {inputNumberFormatter, inputNumberParser} from '@/helpers'

import {FiltersContext} from '@/screens/App'
import Filters from '@/components/Structure/Filters'

const CounselorFilters = (props) => {
  const {
    counselorFilters: {filters, setFilters, resetFilters},
  } = useContext(FiltersContext)

  const [balanceError, setBalanceError] = useState(false)

  useEffect(() => {
    if (filters.applyFilters) {
      props.onApplyFilters()
      setFilters({...filters, applyFilters: false})
    }
  }, [filters])

  const handleApplyFilters = () => {
    if (!balanceError) {
      setFilters({...filters, applyFilters: true})
    }
  }

  const handleResetFilters = () => {
    setBalanceError(false)
    resetFilters()
  }

  return (
    <Filters>
      <Row>
        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>First name</strong>
            <br />
            <em>Search by first name</em>
          </p>

          <Input
            placeholder="First name"
            value={filters.firstName}
            allowClear
            onChange={(e) =>
              setFilters({...filters, firstName: e.target.value})
            }
          />
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Last name</strong>
            <br />
            <em>Search by last name</em>
          </p>

          <Input
            placeholder="Last name"
            value={filters.lastName}
            allowClear
            onChange={(e) => setFilters({...filters, lastName: e.target.value})}
          />
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Is active</strong>
            <br />
            <em>Filter by active counselors</em>
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
                <Menu.Item key="all">All counselors</Menu.Item>
                <Menu.Item key="true">Active counselors</Menu.Item>
                <Menu.Item key="false">Inactive counselors</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.isActive === 'all'
                ? 'All counselors'
                : filters.isActive === 'true'
                ? 'Active counselors'
                : 'Inactive counselors'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Starting balance</strong>
            <br />
            <em>Filter by starting balance</em>
          </p>

          <InputNumber
            formatter={inputNumberFormatter}
            min={0}
            parser={inputNumberParser}
            step={0.01}
            value={filters.balanceStart}
            onBlur={() =>
              setBalanceError(filters.balanceEnd < filters.balanceStart)
            }
            onChange={(value) => setFilters({...filters, balanceStart: value})}
          />

          <div css={{display: 'inline', margin: '0 5px'}}>-</div>

          <InputNumber
            formatter={inputNumberFormatter}
            min={0}
            parser={inputNumberParser}
            step={0.01}
            value={filters.balanceEnd}
            onBlur={() =>
              setBalanceError(filters.balanceEnd < filters.balanceStart)
            }
            onChange={(value) => setFilters({...filters, balanceEnd: value})}
          />

          {balanceError && (
            <p css={{marginBottom: 0}}>
              <small>
                <Typography.Text type="danger">
                  The start balance must be less than the end balance.
                </Typography.Text>
              </small>
            </p>
          )}
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

CounselorFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default CounselorFilters
