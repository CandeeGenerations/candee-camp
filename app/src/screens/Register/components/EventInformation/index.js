/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'
import React, {useContext, useEffect} from 'react'
import {Typography, Divider, Skeleton, Row, Col, Switch, Button} from 'antd'

import {RegisterContext} from '../..'
import GroupForm from './components/GroupForm'
import EventMetaData from './components/EventMetaData'
import SingleCamperForm from './components/SingleCamperForm'

import {eventActions} from '@/actions'
import {openNotification} from '@/helpers'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

const EventInformation = props => {
  const registerContext = useContext(RegisterContext)
  const routerContext = useRoute()
  const event = useAsyncLoad(
    eventActions.loadEvent,
    routerContext.route.params.eventId,
  )

  const loadEvent = async () => {
    const response = await event.load()

    registerContext.setLoading(false)
    registerContext.setEvent(response.data)
  }

  useEffect(() => {
    if (registerContext.authorized) {
      loadEvent()
    }
  }, [registerContext.authorized])

  const handleNextClick = () => {
    if (
      registerContext.singleCamper &&
      !registerContext.fields.firstName.value
    ) {
      openNotification('error', 'The first name is required.')
      return
    } else if (
      registerContext.singleCamper &&
      !registerContext.fields.lastName.value
    ) {
      openNotification('error', 'The last name is required.')
      return
    } else if (
      !registerContext.singleCamper &&
      !registerContext.groupFields.name.value
    ) {
      openNotification('error', 'The group name is required.')
      return
    } else if (
      !registerContext.singleCamper &&
      registerContext.groupCampers.length === 0
    ) {
      openNotification(
        'error',
        'There has to be at least one camper in your group.',
      )
      return
    }

    props.onNext()
  }

  return (
    <>
      <Typography.Title>Register for an Event</Typography.Title>

      <Divider />

      {event.loading ? (
        <Skeleton />
      ) : (
        <>
          <EventMetaData event={event} />

          <Divider />

          <Row css={{marginBottom: 25, textAlign: 'center'}} gutter={16}>
            <Col
              css={{
                fontSize: 18,
                cursor: 'pointer',
                fontWeight: registerContext.singleCamper ? 'normal' : 'bold',
              }}
              md={10}
              sm={24}
              onClick={() => registerContext.setSingleCamper(false)}
            >
              Group
            </Col>

            <Col md={4} sm={24}>
              <Switch
                checked={registerContext.singleCamper}
                onChange={checked => registerContext.setSingleCamper(checked)}
              />
            </Col>

            <Col
              css={{
                fontSize: 18,
                cursor: 'pointer',
                fontWeight: registerContext.singleCamper ? 'bold' : 'normal',
              }}
              md={10}
              sm={24}
              onClick={() => registerContext.setSingleCamper(true)}
            >
              Single Camper
            </Col>
          </Row>

          {registerContext.singleCamper ? <SingleCamperForm /> : <GroupForm />}

          <Row gutter={16}>
            <Col span={24} style={{textAlign: 'center'}}>
              <Button size="large" type="primary" onClick={handleNextClick}>
                Next
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

EventInformation.propTypes = {
  // functions
  onNext: PropTypes.func.isRequired,
}

export default EventInformation
