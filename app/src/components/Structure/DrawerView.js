import React from 'react'
import {Button, Drawer} from 'antd'
import {useRouter} from 'react-router5'

import DisabledButtonPopup from '../DisabledButtonPopup'

type Props = {
  children: React.Node,
  fields: {},
  parentRoute: string,
  submitButtonDisabled?: boolean,
  title: string,
  width?: number,

  // functions
  onSubmit: () => void,
}

const DrawerView = (props: Props) => {
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
        style={{
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
        <Button style={{marginRight: 8}} onClick={handleClose}>
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

export default DrawerView
