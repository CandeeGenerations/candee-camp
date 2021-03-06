/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Popconfirm,
  Row,
  Switch,
  Typography,
  DatePicker,
  InputNumber,
  Select,
} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {
  inputPercentFormatter,
  inputPercentParser,
  inputNumberFormatter,
  inputNumberParser,
  formatDate,
} from '@/helpers'

const CouponForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    if (changedFields.code) {
      if (changedFields.code.value.trim().endsWith('-')) {
        changedFields.code.value = changedFields.code.value.replace('--', '-')
      } else {
        changedFields.code.value = changedFields.code.value.replace(' ', '-')
      }

      changedFields.code.value = changedFields.code.value
        .trim()
        .replace(/[^-\w\s]/gi, '')
    }

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {name, code, expirationDate, type, amount, isActive} = props

    return {
      name: Form.createFormField({
        ...name,
        value: name.value,
      }),
      code: Form.createFormField({
        ...code,
        value: code.value,
      }),
      expirationDate: Form.createFormField({
        ...expirationDate,
        value: expirationDate.value,
      }),
      type: Form.createFormField({
        ...type,
        value: type.value,
      }),
      amount: Form.createFormField({
        ...amount,
        value: amount.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
    }
  },
})((props) => {
  const page = usePage()

  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">Coupon Info</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'The name is required.'}],
            })(<Input placeholder="e.g. 20% Off Coupon" autoFocus />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Code" hasFeedback>
            {getFieldDecorator('code', {
              rules: [{required: true, message: 'The code is required.'}],
            })(<Input placeholder="e.g. 20-off" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Expiration Date">
            {getFieldDecorator('expirationDate')(
              <DatePicker format="MM/DD/YYYY" />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Type">
            {getFieldDecorator('type')(
              <Select>
                <Select.Option value="1">Dollar</Select.Option>
                <Select.Option value="2">Percent</Select.Option>
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Amount" hasFeedback>
            {getFieldDecorator('amount', {
              rules: [{required: true, message: 'The amount is required.'}],
            })(
              <InputNumber
                formatter={
                  props.type.value === '2'
                    ? inputPercentFormatter
                    : inputNumberFormatter
                }
                parser={
                  props.type.value === '2'
                    ? inputPercentParser
                    : inputNumberParser
                }
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      {page.isCouponEditPage && (
        <React.Fragment>
          <Divider css={{marginTop: 40}} orientation="left">
            <Typography.Text type="danger">Danger Zone</Typography.Text>
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Is Active" labelCol={{span: 10}}>
                {getFieldDecorator('isActive')(
                  <Switch
                    checked={props.isActive.value}
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Popconfirm
                cancelText="Cancel"
                icon={<Icon css={{color: 'red'}} type="question-circle-o" />}
                okText="Delete"
                okType="danger"
                placement="topRight"
                title={
                  <p>
                    Are you sure you want
                    <br />
                    to delete this coupon?
                  </p>
                }
                onConfirm={props.onDeleteCoupon}
              >
                <Button type="danger">Delete Coupon</Button>
              </Popconfirm>
            </Col>
          </Row>

          <Row css={{marginTop: 20}} gutter={16}>
            <Col span={24}>
              <Typography.Text type="secondary">
                <small>
                  Date Created: {formatDate(props.createdDate?.value || null)}
                </small>
              </Typography.Text>

              <Typography.Text css={{display: 'block'}} type="secondary">
                <small>
                  Date Updated: {formatDate(props.updatedDate?.value || null)}
                </small>
              </Typography.Text>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Form>
  )
})

export default CouponForm
