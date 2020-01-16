import React from 'react'
import {Modal} from 'antd'
import PropTypes from 'prop-types'

import CamperForm from '@/screens/Campers/components/CamperView/CamperForm'

const CamperModal = props => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={props.onSave}
    >
      <CamperForm
        {...props.data}
        couponsList={props.coupons}
        clientForm
        onChange={props.onFieldChange}
      />
    </Modal>
  )
}

CamperModal.propTypes = {
  data: PropTypes.shape({}),
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,

  // functions
  onCancel: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default CamperModal
