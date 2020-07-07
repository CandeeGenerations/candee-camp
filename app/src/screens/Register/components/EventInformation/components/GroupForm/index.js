/** @jsx jsx */
import {jsx} from '@emotion/core'
import moment from 'moment'
import _maxBy from 'lodash/maxBy'
import {Row, Col, Form, Input, Icon} from 'antd'
import React, {useContext, useState} from 'react'

import {openNotification} from '@/helpers'

import {RegisterContext} from '../../../..'
import CamperCard from './components/CamperCard'
import CamperModal from './components/CamperModal'

const GroupForm = () => {
  const [camper, setCamper] = useState({
    visible: false,
    data: null,
  })
  const registerContext = useContext(RegisterContext)
  const {
    discount,
    event,
    groupFields,
    groupCampers,
    handleGroupFieldChange,
    setGroupCampers,
    customFields,
    setDiscount,
  } = registerContext
  const [couponLoading, setCouponLoading] = useState(false)

  const handleApplyCoupon = async (code) => {
    setCouponLoading(true)

    await registerContext.applyCoupon(code)

    setCouponLoading(false)
  }

  const handleClickCamper = (data) =>
    setCamper({
      visible: true,
      data: data
        ? {...data}
        : {...registerContext.fieldDeclarations, camperCustomFields: []},
    })

  const handleCustomFieldsUpdate = (customField) =>
    setCamper((c) => ({
      ...c,
      data: {
        ...c.data,
        camperCustomFields: [
          ...c.data.camperCustomFields.filter(
            (x) => x.customFieldId !== customField.customFieldId,
          ),
          customField,
        ],
      },
    }))

  const handleFieldChange = (changedFields) =>
    setCamper((c) => ({...c, data: {...c.data, ...changedFields}}))

  const handleCancel = () => setCamper((c) => ({...c, visible: false}))

  const handleDeleteCamper = (id) => {
    setGroupCampers([...groupCampers.filter((x) => x.id !== id)])
    handleCancel()
  }

  const handleSaveCamper = async () => {
    if (!camper.data.firstName.value) {
      openNotification('error', 'The first name is required.')
      return
    }

    if (!camper.data.lastName.value) {
      openNotification('error', 'The last name is required.')
      return
    }
    const {birthDate, parentFirstName, parentLastName} = camper.data
    const currentTime = moment()

    if (
      birthDate.value &&
      birthDate.value.isAfter(moment(currentTime).subtract(18, 'years')) &&
      birthDate.value.isBefore(currentTime) &&
      (!parentFirstName.value || !parentLastName.value)
    ) {
      openNotification(
        'error',
        "This parent's information is required for this minor camper.",
      )
      return
    }

    let customError = false

    customFields.results
      .filter((x) => x.required)
      .some((customField) => {
        const field = camper.data.camperCustomFields.find(
          (x) => x.customFieldId === customField.id,
        )

        if (!field || !field.value) {
          customError = true
          openNotification(
            'error',
            `The field "${customField.name}" is required.`,
          )
          return true
        }

        return false
      })

    if (customError) {
      return
    }

    if (camper.data.id) {
      const newCampers = groupCampers.map((x) =>
        x.id === camper.data.id ? camper.data : x,
      )

      await setGroupCampers(newCampers)
    } else {
      const nextId =
        groupCampers.length > 0
          ? Number(_maxBy(groupCampers, (x) => Number(x.id)).id) + 1
          : 1

      await setGroupCampers((campers) => [
        ...campers,
        {...camper.data, id: nextId},
      ])
    }

    handleCancel()
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Group Name" required>
            <Input
              placeholder="e.g. Central Baptist Church"
              value={groupFields.name.value || ''}
              onChange={(e) =>
                handleGroupFieldChange({
                  name: {value: e.target.value},
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <p>Campers</p>

      <Row css={{margin: '10px 0'}} gutter={16}>
        <Col span={24}>
          {groupCampers.map((x) => (
            <CamperCard
              key={x.id}
              data={x}
              onClick={() => handleClickCamper(x)}
            />
          ))}

          <CamperCard new onClick={() => handleClickCamper()} />
        </Col>
      </Row>

      {event.cost > 0 && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Coupon">
              <Input.Search
                enterButton="Apply"
                loading={couponLoading}
                placeholder="e.g. coupon-123"
                value={registerContext.fields.coupon.value || ''}
                onChange={(e) =>
                  registerContext.handleFieldChange({
                    coupon: {value: e.target.value},
                  })
                }
                onSearch={handleApplyCoupon}
              />

              {discount.amount > 0 && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setDiscount({amount: 0, type: 'Dollar'})
                    registerContext.handleFieldChange({
                      coupon: {value: null},
                    })
                  }}
                >
                  <Icon type="close" /> Remove discount
                </a>
              )}
            </Form.Item>
          </Col>
        </Row>
      )}

      <CamperModal
        customFields={customFields.results || []}
        data={camper.data}
        title={(camper.data && camper.data.firstName.value) || 'New Camper'}
        visible={camper.visible}
        onCancel={handleCancel}
        onCustomFieldsUpdate={handleCustomFieldsUpdate}
        onDelete={handleDeleteCamper}
        onFieldChange={handleFieldChange}
        onSave={handleSaveCamper}
      />
    </>
  )
}

export default GroupForm
