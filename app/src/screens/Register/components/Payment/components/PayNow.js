import React, {useContext, useEffect} from 'react'
import {Col, Row} from 'antd'
import PropTypes from 'prop-types'

import Config from '@/config'
import {payPalPaymentActions} from '@/actions'

import {RegisterContext} from '@/screens/Register'
import IncludeScript from '@/components/IncludeScript'
import {openNotification} from '@/helpers'

const PayNow = (props) => {
  const registerContext = useContext(RegisterContext)

  const handleApprove = async (data, actions) => {
    registerContext.setLoading(true)

    const details = await actions.order.capture()

    if (details.status === 'COMPLETED') {
      const payment = await payPalPaymentActions.savePayment({
        type: 0, // payment
        amount: registerContext.eventCost,
        processor: 0, // paypal
        payPalId: details.id,
        createdDate: details.create_time,
        status: details.status,
        emailAddress: details.payer.email_address,
        payerId: details.payer.payer_id,
      })

      await props.onRegister(payment.data.id)
    } else {
      openNotification(
        'error',
        'There was an error processing your payment. Please try again.',
      )
    }

    registerContext.setLoading(false)
  }

  useEffect(() => {
    setTimeout(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: registerContext.eventCost,
                  },
                },
              ],
            }),
          onApprove: handleApprove,
        })
        .render('#paypal-button-container')
    }, 700)
  }, [])

  return (
    <IncludeScript
      id="paypal-js"
      src={`${Config.paypalScriptUrl}${registerContext.payPalClientId.value}`}
    >
      <p>
        You can use your PayPal Account or a normal Credit Card here to pay for
        this event.
      </p>

      <Row gutter={16}>
        <Col md={3} sm={0} />

        <Col md={18} sm={24}>
          <div id="paypal-button-container" />
        </Col>
      </Row>
    </IncludeScript>
  )
}

PayNow.propTypes = {
  // functions
  onRegister: PropTypes.func.isRequired,
}

export default PayNow
