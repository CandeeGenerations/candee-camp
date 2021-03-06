/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import React, {useContext, useEffect} from 'react'
import {Button, Col, Row, Input, Dropdown, Icon, Menu} from 'antd'

import {FiltersContext} from '@/screens/App'
import Filters from '@/components/Structure/Filters'

const GroupFilters = (props) => {
  const {
    groupFilters: {filters, setFilters, resetFilters},
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
            <strong>Is Active</strong>
            <br />
            <em>Filter by active groups</em>
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
                <Menu.Item key="all">All groups</Menu.Item>
                <Menu.Item key="true">Active groups</Menu.Item>
                <Menu.Item key="false">Inactive groups</Menu.Item>
              </Menu>
            }
          >
            <Button css={{textAlign: 'left', width: '100%'}}>
              {filters.isActive === 'all'
                ? 'All groups'
                : filters.isActive === 'true'
                ? 'Active groups'
                : 'Inactive groups'}{' '}
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

GroupFilters.propTypes = {
  // functions
  onApplyFilters: PropTypes.func.isRequired,
}

export default GroupFilters
