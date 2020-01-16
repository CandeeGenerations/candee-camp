import React, {useContext} from 'react'
import {Row, Col, Form, Input} from 'antd'

import {RegisterContext} from '../..'

import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

const SingleCamperForm = props => {
  const registerContext = useContext(RegisterContext)

  return (
    <>
      <CamperForm
        {...registerContext.fields}
        couponsList={props.coupons}
        clientForm
        onChange={registerContext.handleFieldChange}
      />

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Coupon">
            <Input
              placeholder="e.g. coupon-123"
              value={registerContext.fields.coupon.value || ''}
              onChange={e =>
                registerContext.handleFieldChange({
                  coupon: {value: e.target.value},
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
export default SingleCamperForm
