/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import React, {useContext, useState} from 'react'
import {Row, Col, Button, Typography, Divider} from 'antd'

import {RegisterContext} from '../..'

import Free from './components/Free'

import {registerActions as actions} from '@/actions'

const Payment = props => {
  const [loading, setLoading] = useState(false)
  const registerContext = useContext(RegisterContext)

  console.log('registerContext.event :', registerContext.event)

  const handleRegister = async () => {
    setLoading(true)

    const response = await actions.registerForEvent({
      eventId: registerContext.event.id,
      singleCamper: registerContext.singleCamper,
      camper: registerContext.fields,
      group: registerContext.groupFields,
      groupCampers: registerContext.groupCampers,
    })

    console.log('response :', response)

    setLoading(false)

    // props.onNext
  }

  return (
    <>
      <Typography.Title>Make a Payment</Typography.Title>

      <Divider />

      {registerContext.cost > 0 ? 'coming soon' : <Free />}

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

          <Button
            loading={loading}
            size="large"
            type="primary"
            onClick={handleRegister}
          >
            Confirm Registration
          </Button>
        </Col>
      </Row>
    </>
  )
}

Payment.propTypes = {
  // functions
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
}

export default Payment
