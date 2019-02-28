import React from 'react'
import {Icon, Popover, Progress} from 'antd'

import {formErrors, percentComplete} from '../../helpers'

type Props = {
  children: React.ReactNode,
  fields: {},
  placement?: string,
  showProgress?: boolean,
}

const DisabledButtonPopup = (props: Props) => {
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
      {props.showProgress && <Progress percent={percent} showInfo={false} />}
    </>
  )
}

DisabledButtonPopup.defaultProps = {
  placement: 'top',
  showProgress: true,
}

export default DisabledButtonPopup
