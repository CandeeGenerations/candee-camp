/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Typography} from 'antd'

import {formatDate, formatCurrency} from '@/helpers'

const EventMetaData = (props) => {
  return (
    <>
      <Row css={{marginBottom: 15}} gutter={16}>
        <Col span={24}>
          Event Name
          <Typography.Title level={4}>
            {props.event.results.name}
          </Typography.Title>
        </Col>
      </Row>

      <Row css={{marginBottom: 15}} gutter={16}>
        <Col md={12} sm={24}>
          Event Start Date
          <Typography.Title level={4}>
            {formatDate(props.event.results.startDate)}
          </Typography.Title>
        </Col>

        <Col md={12} sm={24}>
          Event End Date
          <Typography.Title level={4}>
            {formatDate(props.event.results.endDate)}
          </Typography.Title>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col css={{textAlign: 'center'}} span={24}>
          Cost
          <Typography.Title css={{color: '#13bf13 !important'}} level={2}>
            {props.event.results.cost && props.event.results.cost > 0
              ? formatCurrency(props.event.results.cost)
              : 'FREE'}
          </Typography.Title>
        </Col>
      </Row>
    </>
  )
}

EventMetaData.propTypes = {
  event: PropTypes.shape({}).isRequired,
}

export default EventMetaData
