import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Popover, Progress} from 'antd'

import Config from '@/config'
import {formErrors, percentComplete} from '@/helpers'

const DisabledButtonPopup = props => {
  const errors = formErrors(props.fields)
  const percent = percentComplete(props.fields)

  return (
    <>
      {errors.length > 0 ? (
        <Popover
          content={
            <>
              {errors.map((error, index) => (
                <p
                  key={index}
                  style={{
                    color: error.type === 'error' ? '#f5222d' : '#faad14',
                  }}
                >
                  {error.type === 'error' ? (
                    <Icon
                      theme="twoTone"
                      twoToneColor="#f5222d"
                      type="close-circle"
                    />
                  ) : (
                    <Icon
                      theme="twoTone"
                      twoToneColor="#faad14"
                      type="exclamation-circle"
                    />
                  )}{' '}
                  {error.message}
                </p>
              ))}
            </>
          }
          placement={props.placement}
          title="Form Errors"
        >
          {props.children}
        </Popover>
      ) : (
        props.children
      )}

      {props.showProgress && Config.features.loadingBar && (
        <Progress percent={percent} showInfo={false} />
      )}
    </>
  )
}

DisabledButtonPopup.defaultProps = {
  placement: 'top',
  showProgress: true,
}

DisabledButtonPopup.propTypes = {
  children: PropTypes.node.isRequired,
  fields: PropTypes.shape({}).isRequired,
  placement: PropTypes.string,
  showProgress: PropTypes.bool,
}

export default DisabledButtonPopup
