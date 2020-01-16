/** @jsx jsx */
import {jsx} from '@emotion/core'
import _maxBy from 'lodash/maxBy'
import {Row, Col, Form, Input} from 'antd'
import React, {useContext, useState} from 'react'

import {RegisterContext} from '../..'
import CamperCard from './components/CamperCard'
import CamperModal from './components/CamperModal'

const GroupForm = () => {
  const [camper, setCamper] = useState({
    visible: false,
    data: null,
  })
  const registerContext = useContext(RegisterContext)
  const {
    groupFields,
    groupCampers,
    handleGroupFieldChange,
    setGroupCampers,
  } = registerContext

  const handleClickCamper = data =>
    setCamper({
      visible: true,
      data: data ? {...data} : {...registerContext.fieldDeclarations},
    })

  const handleFieldChange = changedFields =>
    setCamper(c => ({...c, data: {...c.data, ...changedFields}}))

  const handleSaveCamper = () => {
    if (camper.data.id) {
      const newCampers = groupCampers.map(x =>
        x.id === camper.data.id ? camper.data : x,
      )

      setGroupCampers(newCampers)
    } else {
      const nextId =
        groupCampers.length > 0
          ? Number(_maxBy(groupCampers, x => Number(x.id)).id) + 1
          : 1

      setGroupCampers(campers => [...campers, {...camper.data, id: nextId}])
    }

    setCamper(c => ({...c, visible: false}))
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Group Name" required>
            <Input
              placeholder="e.g. Central Baptist Church"
              value={groupFields.name.value || ''}
              onChange={e =>
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
          {groupCampers.map(x => (
            <CamperCard
              key={x.id}
              data={x}
              onClick={() => handleClickCamper(x)}
            />
          ))}

          <CamperCard new onClick={() => handleClickCamper()} />
        </Col>
      </Row>

      <CamperModal
        data={camper.data}
        title={(camper.data && camper.data.firstName.value) || 'New Camper'}
        visible={camper.visible}
        onCancel={() => setCamper(c => ({...c, visible: false}))}
        onFieldChange={handleFieldChange}
        onSave={handleSaveCamper}
      />
    </>
  )
}

export default GroupForm
