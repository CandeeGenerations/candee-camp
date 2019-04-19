import React from 'react'
import {Col, Form, Input, Row, Select} from 'antd'

import {rolesList} from '../../../../helpers'

const UserForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {emailAddress, firstName, lastName, role, username} = props

    return {
      emailAddress: Form.createFormField({
        ...emailAddress,
        value: emailAddress.value,
      }),
      firstName: Form.createFormField({
        ...firstName,
        value: firstName.value,
      }),
      lastName: Form.createFormField({
        ...lastName,
        value: lastName.value,
      }),
      role: Form.createFormField({
        ...role,
        value: role.value,
      }),
      username: Form.createFormField({
        ...username,
        value: username.value,
      }),
    }
  },
})(props => {
  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" hasFeedback>
            {getFieldDecorator('firstName', {
              rules: [{required: true, message: 'The first name is required.'}],
            })(<Input placeholder="e.g. John" autoFocus />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Last Name" hasFeedback>
            {getFieldDecorator('lastName', {
              rules: [{required: true, message: 'The last name is required.'}],
            })(<Input placeholder="e.g. Doe" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Username" hasFeedback>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'The username is required.'}],
            })(<Input placeholder="e.g. jdoe" />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Email Address" hasFeedback>
            {getFieldDecorator('emailAddress', {
              rules: [
                {required: true, message: 'The email address is required.'},
                {type: 'email', message: 'Please use a valid email.'},
              ],
            })(<Input placeholder="e.g. johndoe@gmail.com" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Role">
            {getFieldDecorator('role', {
              rules: [{required: true, message: 'The role is required.'}],
            })(
              <Select placeholder="e.g. Admin" showSearch>
                {rolesList().map(r => (
                  <Select.Option key={r.value} value={r.value}>
                    {r.text}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default UserForm
