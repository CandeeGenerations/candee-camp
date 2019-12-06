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
  Select,
} from 'antd'

import {selectSearchFunc} from '@/helpers'
import usePage from '@/helpers/hooks/usePage'

const GroupForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {name, campers, loginUser, isActive} = props

    return {
      name: Form.createFormField({
        ...name,
        value: name.value,
      }),
      campers: Form.createFormField({
        ...campers,
        value: campers.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
      loginUser: Form.createFormField({
        ...loginUser,
        value: loginUser.value,
      }),
    }
  },
})(props => {
  const page = usePage()

  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">Group Info</Divider>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Name" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'The name is required.'}],
            })(<Input placeholder="e.g. Central Baptist Church" autoFocus />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Login User Account">
            {getFieldDecorator('loginUser', {
              rules: [
                {
                  required: true,
                  message: 'The login user account is required.',
                },
              ],
            })(
              <Select
                dropdownRender={menu => (
                  <div>
                    <div
                      css={{padding: 8, cursor: 'pointer'}}
                      onClick={() =>
                        props.onCreateNewAccount(page.isGroupAddPage)
                      }
                      onMouseDown={e => e.preventDefault()}
                    >
                      <Icon type="plus" /> Create New User
                    </div>

                    <Divider css={{margin: '4px 0'}} />

                    {menu}
                  </div>
                )}
                filterOption={selectSearchFunc}
                optionFilterProp="children"
                placeholder="e.g. John Doe"
                allowClear
                showSearch
              >
                {props.usersList.map(x => (
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
        <Col span={24}>
          <Form.Item label="Campers">
            {getFieldDecorator('campers')(
              <Select
                filterOption={selectSearchFunc}
                mode="multiple"
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

      {page.isGroupEditPage && (
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
                    to delete this group?
                  </p>
                }
                onConfirm={props.onDeleteGroup}
              >
                <Button type="danger">Delete Group</Button>
              </Popconfirm>
            </Col>
          </Row>
        </>
      )}
    </Form>
  )
})

export default GroupForm
