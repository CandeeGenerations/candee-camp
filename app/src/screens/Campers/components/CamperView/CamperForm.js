/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Icon,
  Input,
  Row,
  Switch,
  Typography,
  Select,
  InputNumber,
} from 'antd'

import {
  selectSearchFunc,
  inputNumberFormatter,
  inputNumberParser,
} from '@/helpers'
import usePage from '@/helpers/hooks/usePage'

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
      startingBalance,
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
      startingBalance: Form.createFormField({
        ...startingBalance,
        value: startingBalance.value,
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
})((props) => {
  const page = usePage()
  const {form, clientForm} = props
  const {getFieldDecorator} = form
  const colSpan = clientForm ? 12 : 6

  return (
    <Form>
      {!clientForm && <Divider orientation="left">Camper Info</Divider>}

      <Row gutter={16}>
        <Col span={colSpan}>
          <Form.Item label="First Name" hasFeedback>
            {getFieldDecorator('firstName', {
              rules: [{required: true, message: 'The first name is required.'}],
            })(<Input placeholder="e.g. John" autoFocus />)}
          </Form.Item>
        </Col>

        <Col span={colSpan}>
          <Form.Item label="Last Name" hasFeedback>
            {getFieldDecorator('lastName', {
              rules: [{required: true, message: 'The last name is required.'}],
            })(<Input placeholder="e.g. Doe" />)}
          </Form.Item>
        </Col>

        {!clientForm && (
          <>
            <Col span={colSpan}>
              <Form.Item label="Parent First Name">
                {getFieldDecorator('parentFirstName')(
                  <Input placeholder="e.g. Joe" />,
                )}
              </Form.Item>
            </Col>

            <Col span={colSpan}>
              <Form.Item label="Parent Last Name">
                {getFieldDecorator('parentLastName')(
                  <Input placeholder="e.g. Doe" />,
                )}
              </Form.Item>
            </Col>
          </>
        )}
      </Row>

      <Row gutter={16}>
        <Col span={colSpan}>
          <Form.Item label="Birthdate">
            {getFieldDecorator('birthDate')(<DatePicker format="MM/DD/YYYY" />)}
          </Form.Item>
        </Col>

        <Col span={colSpan}>
          <Form.Item label="Starting Balance">
            {getFieldDecorator('startingBalance')(
              <InputNumber
                formatter={inputNumberFormatter}
                parser={inputNumberParser}
              />,
            )}
          </Form.Item>
        </Col>

        {!clientForm && (
          <>
            <Col span={colSpan}>
              <Form.Item label="Medicine">
                {getFieldDecorator('medicine')(
                  <Select mode="tags" placeholder="e.g. tylenol" />,
                )}
              </Form.Item>
            </Col>

            <Col span={colSpan}>
              <Form.Item label="Allergies">
                {getFieldDecorator('allergies')(
                  <Select mode="tags" placeholder="e.g. lactose intolerant" />,
                )}
              </Form.Item>
            </Col>
          </>
        )}
      </Row>

      {clientForm && (
        <>
          <Row gutter={16}>
            <Col span={colSpan}>
              <Form.Item label="Parent First Name">
                {getFieldDecorator('parentFirstName')(
                  <Input placeholder="e.g. Joe" />,
                )}
              </Form.Item>
            </Col>

            <Col span={colSpan}>
              <Form.Item label="Parent Last Name">
                {getFieldDecorator('parentLastName')(
                  <Input placeholder="e.g. Doe" />,
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={colSpan}>
              <Form.Item label="Medicine">
                {getFieldDecorator('medicine')(
                  <Select mode="tags" placeholder="e.g. tylenol" />,
                )}
              </Form.Item>
            </Col>

            <Col span={colSpan}>
              <Form.Item label="Allergies">
                {getFieldDecorator('allergies')(
                  <Select mode="tags" placeholder="e.g. lactose intolerant" />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      {!clientForm && (
        <Row gutter={16}>
          <Col span={colSpan}>
            <Form.Item label="Redeemed Coupon">
              {getFieldDecorator('couponId')(
                <Select
                  dropdownRender={(menu) =>
                    page.isRegistrationCamperEditPage ? (
                      menu
                    ) : (
                      <div>
                        <div
                          css={{padding: 8, cursor: 'pointer'}}
                          onClick={() =>
                            props.onCreateNewCoupon(page.isCamperAddPage)
                          }
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <Icon type="plus" /> Create New Coupon
                        </div>

                        <Divider css={{margin: '4px 0'}} />

                        {menu}
                      </div>
                    )
                  }
                  filterOption={selectSearchFunc}
                  optionFilterProp="children"
                  placeholder="e.g. 20% Off Coupon"
                  allowClear
                  showSearch
                >
                  {props.couponsList.map((x) => (
                    <Select.Option key={x.id} value={`${x.id}`}>
                      {x.name} ({x.code})
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
      )}

      <Divider orientation="left">Custom Fields</Divider>

      <Row gutter={16}>
        {props.customFields.map((customField) => {
          let value = ''
          let camperField = null
          const camperFields = props.camperCustomFields.filter(
            (x) => x.customFieldId === customField.id,
          )

          if (camperFields.length > 0) {
            camperField = camperFields[0]
            value = camperField.value
          }

          return (
            <Col key={customField.id} span={colSpan}>
              <Form.Item
                label={customField.name}
                required={customField.required}
              >
                <Input
                  value={value}
                  onChange={(e) =>
                    props.onCustomFieldsUpdate({
                      customFieldId: customField.id,
                      id: camperField?.id || null,
                      value: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          )
        })}
      </Row>

      {page.isCamperEditPage && (
        <>
          <Divider css={{marginTop: 40}} orientation="left">
            <Typography.Text type="danger">Danger Zone</Typography.Text>
          </Divider>

          <Row gutter={16}>
            <Col span={6}>
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
          </Row>
        </>
      )}
    </Form>
  )
})

export default CamperForm
