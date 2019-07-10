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
} from 'antd'

const UserForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {emailAddress, firstName, lastName, isActive} = props

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
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
    }
  },
})(props => {
  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">User Info</Divider>

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
        <Col span={24}>
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

      <Divider orientation="left">Security</Divider>

      <Row gutter={16}>
        <Col span={24}>
          <Button type="primary" onClick={props.onPasswordChange}>
            Change Password
          </Button>
        </Col>
      </Row>

      <Divider orientation="left" style={{marginTop: 40}}>
        <Typography.Text type="danger">Danger Zone</Typography.Text>
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Is Active" labelCol={{span: 10}}>
            {getFieldDecorator('isActive')(
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked
              />,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Popconfirm
            cancelText="Cancel"
            icon={<Icon style={{color: 'red'}} type="question-circle-o" />}
            okText="Delete"
            okType="danger"
            placement="topRight"
            title={
              <p>
                Are you sure you want
                <br />
                to delete this user?
              </p>
            }
            onConfirm={props.onDeleteUser}
          >
            <Button type="danger">Delete User</Button>
          </Popconfirm>
        </Col>
      </Row>
    </Form>
  )
})

export default UserForm
