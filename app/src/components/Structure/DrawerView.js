/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Button, Drawer} from 'antd'
import {useRouter} from 'react-router5'

import DisabledButtonPopup from '@/components/DisabledButtonPopup'
import ProgressBar from '@/components/DisabledButtonPopup/components/ProgressBar'

const DrawerView = props => {
  const router = useRouter()

  const handleClose = () =>
    props.onClose ? props.onClose() : router.navigate(props.parentRoute)

  return (
    <Drawer
      placement="right"
      title={props.title}
      width={props.width}
      visible
      onClose={handleClose}
    >
      <div css={{paddingBottom: 20}}>{props.children}</div>

      <div
        css={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
        }}
      >
        {props.extraButtons}

        <div css={{float: 'right'}}>
          <Button
            css={{display: 'table-cell', float: 'left', marginRight: 8}}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <DisabledButtonPopup
            fields={props.fields}
            placement="topRight"
            showProgress={!props.extraButtons}
          >
            <Button
              css={{display: 'table-cell', float: 'left'}}
              disabled={props.submitButtonDisabled}
              type="primary"
              onClick={props.onSubmit}
            >
              Submit
            </Button>
          </DisabledButtonPopup>
        </div>

        {props.extraButtons && <ProgressBar fields={props.fields} />}
      </div>
    </Drawer>
  )
}

DrawerView.defaultProps = {
  onClose: null,
  parentRoute: null,
  submitButtonDisabled: false,
  width: 256,
}

DrawerView.propTypes = {
  children: PropTypes.node.isRequired,
  extraButtons: PropTypes.node.isRequired,
  fields: PropTypes.shape({}),
  parentRoute: PropTypes.string,
  submitButtonDisabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,

  // functions
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}

export default DrawerView
