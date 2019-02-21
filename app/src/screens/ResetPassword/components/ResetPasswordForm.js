import React from 'react'
import {Form, Input} from 'antd'

const ResetPasswordForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {confirmPassword, newPassword} = props

    return {
      confirmPassword: Form.createFormField({
        ...confirmPassword,
        value: confirmPassword.value,
      }),
      newPassword: Form.createFormField({
        ...newPassword,
        value: newPassword.value,
      }),
    }
  },
})(props => {
  const {form, onSubmit} = props
  const {getFieldDecorator} = form

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Please make sure your passwords match.')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      form.validateFields(['confirmPassword'], {force: true})
    }
    callback()
  }

  return (
    <Form>
      <Form.Item hasFeedback>
        {getFieldDecorator('newPassword', {
          rules: [
            {required: true, message: 'Your new password is required.'},
            {min: 6, message: 'This password is too short.'},
            {validator: validateToNextPassword},
          ],
        })(
          <Input
            placeholder="New password"
            size="large"
            type="password"
            autoFocus
          />,
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator('confirmPassword', {
          rules: [
            {
              required: true,
              message: 'Your confirmation password is required.',
            },
            {validator: compareToFirstPassword},
          ],
        })(
          <Input
            placeholder="Confirm password"
            size="large"
            type="password"
            onKeyUp={e => {
              if (e.keyCode === 13) {
                onSubmit()
              }
            }}
          />,
        )}
      </Form.Item>
    </Form>
  )
})

export default ResetPasswordForm
