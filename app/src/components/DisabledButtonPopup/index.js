/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Popover} from 'antd'

import {formErrors} from '@/helpers'

import ProgressBar from './components/ProgressBar'

const DisabledButtonPopup = (props) => {
  const errors = formErrors(props.fields)

  return (
    <React.Fragment>
      {errors.length > 0 ? (
        <Popover
          content={
            <React.Fragment>
              {errors.map((error, index) => (
                <p
                  key={index}
                  css={{
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
            </React.Fragment>
          }
          placement={props.placement}
          title="Form Errors"
        >
          {props.children}
        </Popover>
      ) : (
        props.children
      )}

      {props.showProgress && <ProgressBar fields={props.fields} />}
    </React.Fragment>
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
