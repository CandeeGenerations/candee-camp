/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Modal, Button} from 'antd'

import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

const CamperModal = (props) => {
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
