/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import {Button, Drawer} from 'antd'
import {useRouter} from 'react-router5'

import DisabledButtonPopup from '@/components/DisabledButtonPopup'

const DrawerView = props => {
  const router = useRouter()
  const handleClose = () => router.navigate(props.parentRoute)

  return (
    <Drawer
      placement="right"
      title={props.title}
      width={props.width}
      visible
      onClose={handleClose}
    >
      {props.children}

      <div
        css={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button css={{marginRight: 8}} onClick={handleClose}>
          Cancel
        </Button>

        <DisabledButtonPopup fields={props.fields} placement="topRight">
          <Button
            disabled={props.submitButtonDisabled}
            type="primary"
            onClick={props.onSubmit}
          >
            Submit
          </Button>
        </DisabledButtonPopup>
      </div>
    </Drawer>
  )
}

DrawerView.defaultProps = {
  submitButtonDisabled: false,
  width: 256,
}

DrawerView.propTypes = {
  children: PropTypes.node.isRequired,
  fields: PropTypes.shape({}),
  parentRoute: PropTypes.string.isRequired,
  submitButtonDisabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,

  // functions
  onSubmit: PropTypes.func.isRequired,
}

export default DrawerView
