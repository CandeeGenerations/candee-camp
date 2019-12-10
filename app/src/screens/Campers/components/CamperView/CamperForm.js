/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {
  Button,
  Col,
  DatePicker,
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

import usePage from '@/helpers/hooks/usePage'
import {selectSearchFunc} from '@/helpers'

const CamperForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {
      firstName,
      lastName,
      birthDate,
      parentFirstName,
      parentLastName,
      medicine,
      allergies,
      couponId,
      isActive,
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
      birthDate: Form.createFormField({
        ...birthDate,
        value: birthDate.value,
      }),
      parentFirstName: Form.createFormField({
        ...parentFirstName,
        value: parentFirstName.value,
      }),
      parentLastName: Form.createFormField({
        ...parentLastName,
        value: parentLastName.value,
      }),
      medicine: Form.createFormField({
        ...medicine,
        value: medicine.value,
      }),
      allergies: Form.createFormField({
        ...allergies,
        value: allergies.value,
      }),
      couponId: Form.createFormField({
        ...couponId,
        value: couponId.value,
      }),
      isActive: Form.createFormField({
        ...isActive,
        value: isActive.value,
      }),
    }
  },
})(props => {
  const page = usePage()

  const {form} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Divider orientation="left">Camper Info</Divider>

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
          <Form.Item label="Birthdate">
            {getFieldDecorator('birthDate')(<DatePicker format="MM/DD/YYYY" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Parent First Name">
            {getFieldDecorator('parentFirstName')(
              <Input placeholder="e.g. Joe" />,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Parent Last Name">
            {getFieldDecorator('parentLastName')(
              <Input placeholder="e.g. Doe" />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Medicine">
            {getFieldDecorator('medicine')(
              <Select mode="tags" placeholder="e.g. tylenol" />,
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Allergies">
            {getFieldDecorator('allergies')(
              <Select mode="tags" placeholder="e.g. lactose intolerant" />,
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Redeemed Coupon">
            {getFieldDecorator('couponId')(
              <Select
                dropdownRender={menu => (
                  <div>
                    <div
                      css={{padding: 8, cursor: 'pointer'}}
                      onClick={() =>
                        props.onCreateNewCoupon(page.isCamperAddPage)
                      }
                      onMouseDown={e => e.preventDefault()}
                    >
                      <Icon type="plus" /> Create New Coupon
                    </div>

                    <Divider css={{margin: '4px 0'}} />

                    {menu}
                  </div>
                )}
                filterOption={selectSearchFunc}
                optionFilterProp="children"
                placeholder="e.g. 20% Off Coupon"
                allowClear
                showSearch
              >
                {props.couponsList.map(x => (
                  <Select.Option key={x.id} value={`${x.id}`}>
                    {x.name} ({x.code})
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>

      {page.isCamperEditPage && (
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
                    to delete this camper?
                  </p>
                }
                onConfirm={props.onDeleteCamper}
              >
                <Button type="danger">Delete Camper</Button>
              </Popconfirm>
            </Col>
          </Row>
        </>
      )}
    </Form>
  )
})

export default CamperForm
