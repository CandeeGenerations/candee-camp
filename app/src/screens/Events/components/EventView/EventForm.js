import React, {useState} from 'react'
import moment from 'moment'
import {Col, DatePicker, Form, Input, Row} from 'antd'

const EventForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {endDate, name, startDate} = props

    return {
      endDate: Form.createFormField({
        ...endDate,
        value: endDate.value ? moment(endDate.value) : null,
      }),
      name: Form.createFormField({
        ...name,
        value: name.value,
      }),
      startDate: Form.createFormField({
        ...startDate,
        value: startDate.value ? moment(startDate.value) : null,
      }),
    }
  },
})(props => {
  const {form} = props
  const {getFieldDecorator} = form
  const [endOpen, setEndOpen] = useState(false)

  const disabledStartDate = startValue => {
    const endValue = props.endDate.value
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  const disabledEndDate = endValue => {
    const startValue = props.startDate.value
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true)
    }
  }

  const handleEndOpenChange = open => setEndOpen(open)

  return (
    <Form>
      <Form.Item label="Name" hasFeedback>
        {getFieldDecorator('name', {
          rules: [
            {required: true, message: 'The name of the event is required.'},
          ],
        })(<Input placeholder="Name" autoFocus />)}
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Start Date" hasFeedback>
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: 'The start date of the event is required.',
                },
              ],
            })(
              <DatePicker
                disabledDate={disabledStartDate}
                placeholder="Start Date"
                onOpenChange={handleStartOpenChange}
              />,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="End Date" hasFeedback>
            {getFieldDecorator('endDate', {
              rules: [
                {
                  required: true,
                  message: 'The end date of the event is required.',
                },
              ],
            })(
              <DatePicker
                disabledDate={disabledEndDate}
                open={endOpen}
                placeholder="End Date"
                onOpenChange={handleEndOpenChange}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default EventForm
