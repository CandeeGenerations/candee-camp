/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Form, Input} from 'antd'

const SigninForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {email, password} = props

    return {
      email: Form.createFormField({
        ...email,
        value: email.value,
      }),
      password: Form.createFormField({
        ...password,
        value: password.value,
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
          <Input placeholder="e.g. johndoe@gmail.com" size="large" autoFocus />,
        )}
      </Form.Item>

      <Form.Item css={{marginTop: 20}}>
        {getFieldDecorator('password', {
          rules: [
            {required: true, message: 'Your password is required.'},
            {min: 6, message: 'This password is too short.'},
          ],
        })(
          <Input.Password
            placeholder="e.g. password123!"
            size="large"
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

export default SigninForm
