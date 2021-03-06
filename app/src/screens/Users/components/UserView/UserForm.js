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
  Popconfirm,
  Row,
  Switch,
  Typography,
} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {formatDate} from '@/helpers'

const UserForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {
      confirmPassword,
      emailAddress,
      firstName,
      id,
      isActive,
      lastName,
      newPassword,
    } = props

    let fields = {
      emailAddress: Form.createFormField({
        ...emailAddress,
        value: emailAddress.value,
      }),
      firstName: Form.createFormField({
        ...firstName,
        value: firstName.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
      lastName: Form.createFormField({
        ...lastName,
        value: lastName.value,
      }),
    }

    if (!id && newPassword && confirmPassword) {
      fields = {
        ...fields,
        confirmPassword: Form.createFormField({
          ...confirmPassword,
          value: confirmPassword.value,
        }),
        newPassword: Form.createFormField({
          ...newPassword,
          value: newPassword.value,
        }),
      }
    }

    return fields
  },
})((props) => {
  const page = usePage()

  const {form} = props
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

      {page.isUserAddOrEditPage && (
        <React.Fragment>
          <Divider orientation="left">Security</Divider>

          {props.id ? (
            <React.Fragment>
              <Row gutter={16}>
                <Col span={24}>
                  <Button type="primary" onClick={props.onPasswordChange}>
                    Change Password
                  </Button>
                </Col>
              </Row>

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
                    icon={
                      <Icon css={{color: 'red'}} type="question-circle-o" />
                    }
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

              <Row css={{marginTop: 20}} gutter={16}>
                <Col span={24}>
                  <Typography.Text type="secondary">
                    <small>
                      Date Created:{' '}
                      {formatDate(props.createdDate?.value || null)}
                    </small>
                  </Typography.Text>

                  <Typography.Text css={{display: 'block'}} type="secondary">
                    <small>
                      Date Updated:{' '}
                      {formatDate(props.updatedDate?.value || null)}
                    </small>
                  </Typography.Text>

                  <Typography.Text css={{display: 'block'}} type="secondary">
                    <small>
                      Date Last Logged In:{' '}
                      {formatDate(props.lastLoggedInDate?.value || null)}
                    </small>
                  </Typography.Text>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('newPassword', {
                    rules: [
                      {required: true, message: 'The password is required.'},
                      {min: 6, message: 'This password is too short.'},
                      {validator: validateToNextPassword},
                    ],
                  })(<Input.Password placeholder="e.g. password123!" />)}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'The confirmation password is required.',
                      },
                      {validator: compareToFirstPassword},
                    ],
                  })(<Input.Password placeholder="e.g. password123!" />)}
                </Form.Item>
              </Col>
            </Row>
          )}
        </React.Fragment>
      )}
    </Form>
  )
})

export default UserForm
