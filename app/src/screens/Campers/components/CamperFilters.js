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

const CamperFilters = (props) => {
  const {
    camperFilters: {filters, setFilters, resetFilters},
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
      <Row css={{marginBottom: 15}}>
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
            <strong>Is active</strong>
            <br />
            <em>Filter by active campers</em>
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
                <Menu.Item key="all">All campers</Menu.Item>
                <Menu.Item key="true">Active campers</Menu.Item>
                <Menu.Item key="false">Inactive campers</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.isActive === 'all'
                ? 'All campers'
                : filters.isActive === 'true'
                ? 'Active campers'
                : 'Inactive campers'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Has medication</strong>
            <br />
            <em>Filter by campers with medication</em>
          </p>

          <Dropdown
            overlay={
              <Menu
                selectedKeys={[filters.hasMedication]}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    hasMedication: e.key,
                  })
                }
              >
                <Menu.Item key="all">All campers</Menu.Item>
                <Menu.Item key="true">Campers with medication</Menu.Item>
                <Menu.Item key="false">Campers without medication</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.hasMedication === 'all'
                ? 'All campers'
                : filters.hasMedication === 'true'
                ? 'Campers with medication'
                : 'Campers without medication'}{' '}
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
            <strong>Parent's name</strong>
            <br />
            <em>Search by parent's name</em>
          </p>

          <Input
            placeholder="Parent's name"
            value={filters.parentsName}
            allowClear
            onChange={(e) =>
              setFilters({...filters, parentsName: e.target.value})
            }
          />
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Has allergies</strong>
            <br />
            <em>Filter by campers with allergies</em>
          </p>

          <Dropdown
            overlay={
              <Menu
                selectedKeys={[filters.hasAllergies]}
                onClick={(e) =>
                  setFilters({
                    ...filters,
                    hasAllergies: e.key,
                  })
                }
              >
                <Menu.Item key="all">All campers</Menu.Item>
                <Menu.Item key="true">Campers with allergies</Menu.Item>
                <Menu.Item key="false">Campers without allergies</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.hasAllergies === 'all'
                ? 'All campers'
                : filters.hasAllergies === 'true'
                ? 'Campers with allergies'
                : 'Campers without allergies'}{' '}
              <Icon css={{float: 'right', marginTop: 4}} type="down" />
            </Button>
          </Dropdown>
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Birthdate</strong>
            <br />
            <em>Filter by birthdate</em>
          </p>

          <DatePicker.RangePicker
            value={filters.birthdates}
            allowClear
            onChange={(dates) => setFilters({...filters, birthdates: dates})}
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

CamperFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default CamperFilters
