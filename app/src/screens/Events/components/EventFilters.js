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
  DatePicker,
  Typography,
} from 'antd'

import {inputNumberFormatter, inputNumberParser} from '@/helpers'

import {FiltersContext} from '@/screens/App'
import Filters from '@/components/Structure/Filters'

const EventFilters = (props) => {
  const {
    eventFilters: {filters, setFilters, resetFilters},
  } = useContext(FiltersContext)

  const [costError, setCostError] = useState(false)

  useEffect(() => {
    if (filters.applyFilters) {
      props.onApplyFilters()
      setFilters({...filters, applyFilters: false})
    }
  }, [filters])

  const handleApplyFilters = () => {
    if (!costError) {
      setFilters({...filters, applyFilters: true})
    }
  }

  const handleResetFilters = () => {
    setCostError(false)
    resetFilters()
  }

  return (
    <Filters>
      <Row>
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
            <strong>Cost</strong>
            <br />
            <em>Filter by cost</em>
          </p>

          <InputNumber
            formatter={inputNumberFormatter}
            min={0}
            parser={inputNumberParser}
            step={0.01}
            value={filters.costStart}
            onBlur={() => setCostError(filters.costEnd < filters.costStart)}
            onChange={(value) => setFilters({...filters, costStart: value})}
          />

          <div css={{display: 'inline', margin: '0 5px'}}>-</div>

          <InputNumber
            formatter={inputNumberFormatter}
            min={0}
            parser={inputNumberParser}
            step={0.01}
            value={filters.costEnd}
            onBlur={() => setCostError(filters.costEnd < filters.costStart)}
            onChange={(value) => setFilters({...filters, costEnd: value})}
          />

          {costError && (
            <p css={{marginBottom: 0}}>
              <small>
                <Typography.Text type="danger">
                  The start cost must be less than the end cost.
                </Typography.Text>
              </small>
            </p>
          )}
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>On Going</strong>
            <br />
            <em>Filter by on going events</em>
          </p>

          <Dropdown
            overlay={
              <Menu
                selectedKeys={[filters.onGoing]}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    onGoing: e.key,
                  })
                }
              >
                <Menu.Item key="all">All events</Menu.Item>
                <Menu.Item key="true">On going events</Menu.Item>
                <Menu.Item key="false">Not on going events</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.onGoing === 'all'
                ? 'All events'
                : filters.onGoing === 'true'
                ? 'On going events'
                : 'Not on going events'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Date</strong>
            <br />
            <em>Filter by date</em>
          </p>

          <DatePicker.RangePicker
            value={filters.dates}
            allowClear
            onChange={(dates) => setFilters({...filters, dates})}
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

          <Button type="primary" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Col>
      </Row>
    </Filters>
  )
}

EventFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default EventFilters
