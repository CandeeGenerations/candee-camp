/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Typography} from 'antd'

import {formatDate, formatCurrency} from '@/helpers'
import {RegisterContext} from '@/screens/Register'

const EventMetaData = (props) => {
  const registerContext = useContext(RegisterContext)
  const {
    discount,
    eventCost,
    groupCampers,
    setEventCost,
    singleCamper,
  } = registerContext

  useEffect(() => {
    let total = props.event.results.cost

    if (!singleCamper) {
      total = total * groupCampers.length
    }

    if (discount.amount > 0) {
      if (discount.type === 'Percent') {
        total = total - total * discount.amount
      } else {
        total = total - discount.amount
      }
    }

    setEventCost(total > 0 ? total : 0)
  }, [props.event.results.cost, singleCamper, groupCampers, discount.amount])

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
            {(eventCost || 0) > 0 ||
            (!singleCamper &&
              groupCampers.length < 1 &&
              (props.event.results.cost || 0) > 0)
              ? formatCurrency(eventCost)
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
