/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import React, {useContext, useState} from 'react'
import {Row, Col, Button, Typography, Divider} from 'antd'

import Free from './components/Free'
import PayNow from './components/PayNow'

import {registerActions as actions} from '@/actions'

import {RegisterContext} from '../..'

const Payment = (props) => {
  const [loading, setLoading] = useState(false)
  const registerContext = useContext(RegisterContext)

  const isPaidEvent = registerContext.eventCost > 0

  const handleRegister = async (paymentId) => {
    setLoading(true)

    await actions.registerForEvent({
      eventId: registerContext.event.id,
      singleCamper: registerContext.singleCamper,
      camper: registerContext.fields,
      camperCustomFields: registerContext.camperCustomFields,
      group: registerContext.groupFields,
      groupCampers: registerContext.groupCampers,
      paymentId,
    })

    setLoading(false)

    props.onNext()
  }

  return (
    <React.Fragment>
      <Typography.Title>Make a Payment</Typography.Title>

      <Divider />

      {isPaidEvent ? <PayNow onRegister={handleRegister} /> : <Free />}

      <Divider />

      <Row gutter={16}>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button
            css={{float: 'left'}}
            size="large"
            type="link"
            onClick={props.onPrevious}
          >
            Back
          </Button>

          {!isPaidEvent && (
            <Button
              loading={loading}
              size="large"
              type="primary"
              onClick={() => handleRegister(null)}
            >
              Confirm Registration
            </Button>
          )}
        </Col>
      </Row>
    </React.Fragment>
  )
}

Payment.propTypes = {
  // functions
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
}

export default Payment
