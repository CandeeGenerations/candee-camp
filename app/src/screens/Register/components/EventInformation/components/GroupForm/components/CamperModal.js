/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Modal, Row, Col, Form, Input, Button} from 'antd'

import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

const CamperModal = props => {
  return (
    <Modal
      footer={[
        props.data && props.data.id && (
          <Button
            key="delete"
            css={{float: 'left'}}
            type="danger"
            onClick={() => props.onDelete(props.data.id)}
          >
            Delete
          </Button>
        ),
        <Button key="back" onClick={props.onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={props.onSave}>
          OK
        </Button>,
      ]}
      title={props.title}
      // onCancel={props.onCancel}
      // onOk={props.onSave}
      visible={props.visible}
    >
      <CamperForm
        {...props.data}
        couponsList={props.coupons}
        customFields={props.customFields}
        clientForm
        onChange={props.onFieldChange}
        onCustomFieldsUpdate={props.onCustomFieldsUpdate}
      />

      {props.data && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Coupon">
              <Input
                placeholder="e.g. coupon-123"
                value={props.data.coupon.value || ''}
                onChange={e =>
                  props.onFieldChange({
                    coupon: {value: e.target.value},
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Modal>
  )
}

CamperModal.propTypes = {
  customFields: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.shape({}),
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,

  // functions
  onCancel: PropTypes.func.isRequired,
  onCustomFieldsUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default CamperModal
