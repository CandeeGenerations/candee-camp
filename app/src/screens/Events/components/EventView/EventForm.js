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
} from 'antd'

import usePage from '@/helpers/hooks/usePage'

const EventForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {dateTime, name} = props

    return {
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
})(props => {
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

      {page.isEventEditPage && (
        <>
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
        </>
      )}
    </Form>
  )
})

export default EventForm
