/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext, useEffect, useState} from 'react'
import {useRoute} from 'react-router5'
import {Typography, Divider, Skeleton, Row, Col, Switch} from 'antd'

import GroupForm from './GroupForm'
import SingleCamperForm from './SingleCamperForm'

import {RegisterContext} from '..'

import {eventActions} from '@/actions'

import {formatDate, formatCurrency} from '@/helpers'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

const EventInformation = () => {
  const [singleCamper, setSingleCamper] = useState(true)
  const registerContext = useContext(RegisterContext)
  const routerContext = useRoute()
  const event = useAsyncLoad(
    eventActions.loadEvent,
    routerContext.route.params.eventId,
  )

  const loadEvent = async () => {
    await event.load()

    registerContext.setLoading(false)
  }

  useEffect(() => {
    if (registerContext.authorized) {
      loadEvent()
    }
  }, [registerContext.authorized])

  return (
    <>
      <Typography.Title>Register for an Event</Typography.Title>

      <Divider />

      {event.loading ? (
        <Skeleton />
      ) : (
        <>
          <Row css={{marginBottom: 15}} gutter={16}>
            <Col span={24}>
              Event Name
              <Typography.Title level={4}>
                {event.results.name}
              </Typography.Title>
            </Col>
          </Row>

          <Row css={{marginBottom: 15}} gutter={16}>
            <Col md={12} sm={24}>
              Event Start Date
              <Typography.Title level={4}>
                {formatDate(event.results.startDate)}
              </Typography.Title>
            </Col>

            <Col md={12} sm={24}>
              Event End Date
              <Typography.Title level={4}>
                {formatDate(event.results.endDate)}
              </Typography.Title>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col css={{textAlign: 'center'}} span={24}>
              Cost
              <Typography.Title css={{color: '#13bf13 !important'}} level={2}>
                {event.results.cost && event.results.cost > 0
                  ? formatCurrency(event.results.cost)
                  : 'FREE'}
              </Typography.Title>
            </Col>
          </Row>

          <Divider />

          <Row css={{marginBottom: 25, textAlign: 'center'}} gutter={16}>
            <Col css={{fontSize: 18}} md={10} sm={24}>
              Group
            </Col>

            <Col md={4} sm={24}>
              <Switch
                checked={singleCamper}
                onChange={checked => setSingleCamper(checked)}
              />
            </Col>

            <Col css={{fontSize: 18}} md={10} sm={24}>
              Single Camper
            </Col>
          </Row>

          {singleCamper ? <SingleCamperForm /> : <GroupForm />}
        </>
      )}
    </>
  )
}

export default EventInformation
