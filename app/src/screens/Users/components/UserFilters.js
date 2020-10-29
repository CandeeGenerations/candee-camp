/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import React, {useContext, useEffect} from 'react'
import {Button, Col, Row, Input, Dropdown, Icon, Menu} from 'antd'

import {FiltersContext} from '@/screens/App'
import Filters from '@/components/Structure/Filters'

const UserFilters = (props) => {
  const {
    userFilters: {filters, setFilters, resetFilters},
  } = useContext(FiltersContext)

  useEffect(() => {
    if (filters.applyFilters) {
      props.onApplyFilters()
      setFilters({...filters, applyFilters: false})
    }
  }, [filters])

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
            <strong>Email address</strong>
            <br />
            <em>Search by email address</em>
          </p>

          <Input
            placeholder="Email address"
            value={filters.emailAddress}
            allowClear
            onChange={(e) =>
              setFilters({...filters, emailAddress: e.target.value})
            }
          />
        </Col>

        <Col css={{padding: '0 15px'}} span={6}>
          <p>
            <strong>Is Active</strong>
            <br />
            <em>Filter by active users</em>
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
                <Menu.Item key="all">All users</Menu.Item>
                <Menu.Item key="true">Active users</Menu.Item>
                <Menu.Item key="false">Inactive users</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.isActive === 'all'
                ? 'All users'
                : filters.isActive === 'true'
                ? 'Active users'
                : 'Inactive users'}{' '}
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

          <Button
            type="primary"
            onClick={() => setFilters({...filters, applyFilters: true})}
          >
            Apply
          </Button>
        </Col>
      </Row>
    </Filters>
  )
}

UserFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default UserFilters
