/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext, useState} from 'react'
import {Row, Col, Form, Input, Icon} from 'antd'

import loader from '@/components/Structure/Loader'
import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

import {RegisterContext} from '../../../..'

const SingleCamperForm = (props) => {
  const registerContext = useContext(RegisterContext)
  const {
    applyCoupon,
    camperCustomFields,
    customFields,
    discount,
    event,
    fields,
    handleCustomFieldsUpdate,
    handleFieldChange,
    setDiscount,
  } = registerContext
  const [couponLoading, setCouponLoading] = useState(false)

  const handleApplyCoupon = async (code) => {
    setCouponLoading(true)

    await applyCoupon(code)

    setCouponLoading(false)
  }

  return props.loader.spinning ? (
    <div css={{height: 200}} />
  ) : (
    <React.Fragment>
      <CamperForm
        {...fields}
        camperCustomFields={camperCustomFields}
        couponsList={props.coupons}
        customFields={customFields.results || []}
        clientForm
        onChange={handleFieldChange}
        onCustomFieldsUpdate={handleCustomFieldsUpdate}
      />

      {event.cost > 0 && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Coupon">
              <Input.Search
                enterButton="Apply"
                loading={couponLoading}
                placeholder="e.g. coupon-123"
                value={registerContext.fields.coupon.value || ''}
                onChange={(e) =>
                  registerContext.handleFieldChange({
                    coupon: {value: e.target.value},
                  })
                }
                onSearch={handleApplyCoupon}
              />

              {discount.amount > 0 && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setDiscount({amount: 0, type: 'Dollar'})
                    registerContext.handleFieldChange({
                      coupon: {value: null},
                    })
                  }}
                >
                  <Icon type="close" /> Remove discount
                </a>
              )}
            </Form.Item>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export default loader(SingleCamperForm)
