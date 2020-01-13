/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Icon,
  Popconfirm,
  Row,
  Switch,
  Typography,
  Select,
  InputNumber,
} from 'antd'

import {
  selectSearchFunc,
  inputNumberFormatter,
  inputNumberParser,
} from '@/helpers'
import usePage from '@/helpers/hooks/usePage'

const RegistrationForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {
      startingBalance,
      checkInDate,
      checkOutDate,
      eventId,
      camperId,
      isActive,
    } = props

    return {
      checkInDate: Form.createFormField({
        ...checkInDate,
        value: checkInDate.value,
      }),
      checkOutDate: Form.createFormField({
        ...checkOutDate,
        value: checkOutDate.value,
      }),
      eventId: Form.createFormField({
        ...eventId,
        value: eventId.value,
      }),
      camperId: Form.createFormField({
        ...camperId,
        value: camperId.value,
      }),
      startingBalance: Form.createFormField({
        ...startingBalance,
        value: startingBalance.value,
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
      <Divider orientation="left">Registration Info</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Event">
            {getFieldDecorator('eventId')(
              <Select
                filterOption={selectSearchFunc}
                placeholder="e.g. Summer Camp"
                allowClear
              >
                {props.eventsList.map(x => (
                  <Select.Option key={x.id} value={`${x.id}`}>
                    {x.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Camper">
            {getFieldDecorator('camperId')(
              <Select
                filterOption={selectSearchFunc}
                placeholder="e.g. John Doe"
                allowClear
              >
                {props.campersList.map(x => (
                  <Select.Option key={x.id} value={`${x.id}`}>
                    {x.firstName} {x.lastName}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Check In Date">
            {getFieldDecorator('checkInDate')(
              <DatePicker format="MM/DD/YYYY" />,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Check Out Date">
            {getFieldDecorator('checkOutDate')(
              <DatePicker format="MM/DD/YYYY" />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Starting Balance">
            {getFieldDecorator('startingBalance')(
              <InputNumber
                formatter={inputNumberFormatter}
                parser={inputNumberParser}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      {page.isRegistrationEditPage && (
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
                    to delete this registration?
                  </p>
                }
                onConfirm={props.onDeleteRegistration}
              >
                <Button type="danger">Delete Registration</Button>
              </Popconfirm>
            </Col>
          </Row>
        </>
      )}
    </Form>
  )
})

export default RegistrationForm
