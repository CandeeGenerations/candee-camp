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
  InputNumber,
  Popconfirm,
  Row,
  Switch,
  Typography,
} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {inputNumberFormatter, inputNumberParser} from '@/helpers'

const SnackShopItemForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {name, price, barcode, amountAvailable, isActive} = props

    return {
      name: Form.createFormField({
        ...name,
        value: name.value,
      }),
      price: Form.createFormField({
        ...price,
        value: price.value,
      }),
      barcode: Form.createFormField({
        ...barcode,
        value: barcode.value,
      }),
      amountAvailable: Form.createFormField({
        ...amountAvailable,
        value: amountAvailable.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
    }
  },
})(props => {
  const page = usePage()

  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">Snack Shop Item Info</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'The name is required.'}],
            })(<Input placeholder="e.g. Candy Bar" autoFocus />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Barcode" hasFeedback>
            {getFieldDecorator('barcode')(
              <Input placeholder="e.g. Z-ABC123" />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Price">
            {getFieldDecorator('price')(
              <InputNumber
                formatter={inputNumberFormatter}
                parser={inputNumberParser}
              />,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Amount Available">
            {getFieldDecorator('amountAvailable')(<InputNumber />)}
          </Form.Item>
        </Col>
      </Row>

      {page.isSnackShopItemEditPage && (
        <>
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
                    to delete this snack shop item?
                  </p>
                }
                onConfirm={props.onDeleteSnackShopItem}
              >
                <Button type="danger">Delete Snack Ship Item</Button>
              </Popconfirm>
            </Col>
          </Row>
        </>
      )}
    </Form>
  )
})

export default SnackShopItemForm
