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
  InputNumber,
  Popconfirm,
  Row,
  Switch,
  Typography,
  Select,
} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {
  inputNumberFormatter,
  inputNumberParser,
  selectSearchFunc,
} from '@/helpers'

const CounselorForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {
      firstName,
      lastName,
      startingBalance,
      userId,
      isActive,
      cabinId,
    } = props

    return {
      firstName: Form.createFormField({
        ...firstName,
        value: firstName.value,
      }),
      lastName: Form.createFormField({
        ...lastName,
        value: lastName.value,
      }),
      startingBalance: Form.createFormField({
        ...startingBalance,
        value: startingBalance.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
      userId: Form.createFormField({
        ...userId,
        value: userId.value,
      }),
      cabinId: Form.createFormField({
        ...cabinId,
        value: cabinId.value,
      }),
    }
  },
})((props) => {
  const page = usePage()

  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">Counselor Info</Divider>

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
          <Form.Item label="User Account">
            {getFieldDecorator('userId', {
              rules: [
                {required: true, message: 'The user account is required.'},
              ],
            })(
              <Select
                dropdownRender={(menu) => (
                  <div>
                    <div
                      css={{padding: 8, cursor: 'pointer'}}
                      onClick={() =>
                        props.onCreateNewAccount(page.isCounselorAddPage)
                      }
                      onMouseDown={(e) => e.preventDefault()}
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
                {props.usersList.map((x) => (
                  <Select.Option key={x.id} value={`${x.id}`}>
                    {x.firstName} {x.lastName}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Starting Balance">
            {getFieldDecorator('startingBalance')(
              <InputNumber
                formatter={inputNumberFormatter}
                parser={inputNumberParser}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Cabin">
            {getFieldDecorator('cabinId')(
              <Select
                dropdownRender={(menu) => (
                  <div>
                    <div
                      css={{padding: 8, cursor: 'pointer'}}
                      onClick={() =>
                        props.onCreateNewCabin(page.isCounselorAddPage)
                      }
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Icon type="plus" /> Create New Cabin
                    </div>

                    <Divider css={{margin: '4px 0'}} />

                    {menu}
                  </div>
                )}
                filterOption={selectSearchFunc}
                optionFilterProp="children"
                placeholder="e.g. Cabin A"
                allowClear
                showSearch
              >
                {props.cabinsList.map((x) => (
                  <Select.Option key={x.id} value={`${x.id}`}>
                    {x.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>

      {page.isCounselorEditPage && (
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
                    to delete this counselor?
                  </p>
                }
                onConfirm={props.onDeleteCounselor}
              >
                <Button type="danger">Delete Counselor</Button>
              </Popconfirm>
            </Col>
          </Row>
        </>
      )}
    </Form>
  )
})

export default CounselorForm
