import React from 'react'
import {Form, Input} from 'antd'

export default Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {email} = props

    return {
      email: Form.createFormField({
        ...email,
        value: email.value,
      }),
    }
  },
})((props) => {
  const {form, onSubmit} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Form.Item hasFeedback>
        {getFieldDecorator('email', {
          rules: [
            {required: true, message: 'Your email is required.'},
            {type: 'email', message: 'Please use a valid email.'},
          ],
        })(
          <Input
            placeholder="e.g. johndoe@gmail.com"
            size="large"
            autoFocus
            onKeyUp={(e) => {
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
