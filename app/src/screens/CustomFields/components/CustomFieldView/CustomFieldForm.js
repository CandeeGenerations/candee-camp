/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Row,
  Switch,
  Typography,
  Select,
  Popconfirm,
  Button,
} from 'antd'

import usePage from '@/helpers/hooks/usePage'
import {formatDate} from '@/helpers'

const CustomFieldForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {name, fieldType, required, isActive} = props

    return {
      name: Form.createFormField({
        ...name,
        value: name.value,
      }),
      fieldType: Form.createFormField({
        ...fieldType,
        value: fieldType.value,
      }),
      required: Form.createFormField({
        ...required,
        value: required.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
    }
  },
})((props) => {
  const page = usePage()
  const {form, clientForm} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      {!clientForm && <Divider orientation="left">Custom Field Info</Divider>}

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Name" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'The name is required.'}],
            })(<Input placeholder="e.g. Cabin Mate Request" autoFocus />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Field Type">
            {getFieldDecorator('fieldType')(
              <Select>
                <Select.Option value="String">String</Select.Option>
                <Select.Option value="Number">Number</Select.Option>
                <Select.Option value="Date">Date</Select.Option>
                <Select.Option value="TextBlock">Text Block</Select.Option>
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Required Field">
            {getFieldDecorator('required')(
              <Switch
                checked={props.required.value}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      {page.isCustomFieldEditPage && (
        <React.Fragment>
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
                    to delete this custom field?
                  </p>
                }
                onConfirm={props.onDeleteCustomField}
              >
                <Button type="danger">Delete Custom Field</Button>
              </Popconfirm>
            </Col>
          </Row>

          <Row css={{marginTop: 20}} gutter={16}>
            <Col span={24}>
              <Typography.Text type="secondary">
                <small>
                  Date Created: {formatDate(props.createdDate?.value || null)}
                </small>
              </Typography.Text>

              <Typography.Text css={{display: 'block'}} type="secondary">
                <small>
                  Date Updated: {formatDate(props.updatedDate?.value || null)}
                </small>
              </Typography.Text>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Form>
  )
})

export default CustomFieldForm
