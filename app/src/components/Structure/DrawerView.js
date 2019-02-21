import React from 'react'
import {Button, Drawer} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as routerActions} from 'redux-router5'

type Props = {
  children: React.Node,
  parentRoute: string,
  submitButtonDisabled?: boolean,
  title: string,
  width?: number,

  // functions
  navigateTo: (routeName: string, params: {}, options: {}) => void,
  onSubmit: () => void,
}

const DrawerView = (
  props: Props = {submitButtonDisabled: false, width: 256},
) => {
  const handleClose = () => props.navigateTo(props.parentRoute)

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

        <Button
          disabled={props.submitButtonDisabled}
          type="primary"
          onClick={props.onSubmit}
        >
          Submit
        </Button>
      </div>
    </Drawer>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: routerActions.navigateTo,
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(DrawerView)
