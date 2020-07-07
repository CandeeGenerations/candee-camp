/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {
  DatePicker,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Popconfirm,
  Icon,
  Button,
  Typography,
  InputNumber,
} from 'antd'

import Config from '@/config'
import usePage from '@/helpers/hooks/usePage'
import {inputNumberFormatter, inputNumberParser, formatDate} from '@/helpers'

import CodeCopy from '@/components/CodeCopy'

const EventForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    if (changedFields.dateTime) {
      changedFields.dateTime.value = changedFields.dateTime.value.map((x) =>
        x.startOf('minute'),
      )
    }

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {cost, dateTime, name} = props

    return {
      cost: Form.createFormField({
        ...cost,
        value: cost.value,
      }),
      dateTime: Form.createFormField({
        ...dateTime,
        value: dateTime.value,
      }),
      name: Form.createFormField({
        ...name,
        value: name.value,
      }),
    }
  },
})((props) => {
  const page = usePage()

  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">Event Info</Divider>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Name" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {required: true, message: 'The name of the event is required.'},
              ],
            })(<Input placeholder="e.g. Summer Camp" autoFocus />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Date &amp; Time" hasFeedback>
            {getFieldDecorator('dateTime', {
              rules: [
                {
                  required: true,
                  message: 'The dates of the event are required.',
                },
              ],
            })(
              <DatePicker.RangePicker
                format="MM/DD/YYYY hh:mm A"
                placeholder={['Start Time', 'End Time']}
                showTime={{format: 'hh:mm A'}}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Cost" hasFeedback>
            {getFieldDecorator('cost')(
              <InputNumber
                formatter={inputNumberFormatter}
                parser={inputNumberParser}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      {page.isEventEditPage && (
        <>
          <Divider css={{marginTop: 40}} orientation="left">
            <Typography.Text>Share</Typography.Text>
          </Divider>

          <p>
            You can send this link to anyone that you would like to sign up for
            your event.
          </p>

          <Row gutter={16}>
            <Col span={24}>
              <CodeCopy>
                {`${Config.appUrl}/register/event/${
                  (props.id && props.id.value) || 0
                }`}
              </CodeCopy>
            </Col>
          </Row>

          <Divider css={{marginTop: 40}} orientation="left">
            <Typography.Text type="danger">Danger Zone</Typography.Text>
          </Divider>

          <Row gutter={16}>
            <Col span={24}>
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
                    to delete this event?
                  </p>
                }
                onConfirm={props.onDeleteEvent}
              >
                <Button type="danger">Delete Event</Button>
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
        </>
      )}
    </Form>
  )
})

export default EventForm
