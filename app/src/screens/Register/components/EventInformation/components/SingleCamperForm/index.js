/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext} from 'react'
import {Row, Col, Form, Input} from 'antd'

import {RegisterContext} from '../../../..'

import loader from '@/components/Structure/Loader'
import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

const SingleCamperForm = props => {
  const registerContext = useContext(RegisterContext)

  return props.loader.spinning ? (
    <div css={{height: 200}} />
  ) : (
    <>
      <CamperForm
        {...registerContext.fields}
        camperCustomFields={registerContext.camperCustomFields}
        couponsList={props.coupons}
        customFields={registerContext.customFields.results || []}
        clientForm
        onChange={registerContext.handleFieldChange}
        onCustomFieldsUpdate={registerContext.handleCustomFieldsUpdate}
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

export default loader(SingleCamperForm)
