import React from 'react'
import {Button, Col, Row} from 'antd'

import {Copyright} from '../../../components/Structure'
import loader from '../../../components/Structure/Loader'

import ResetPasswordForm from './ResetPasswordForm'

import './resetPasswordContent.scss'

type Props = {
  fields: {},
  loading: boolean,
  validForm: boolean,

  // functions
  onFieldChange: () => void,
  onSubmit: () => void,
}

const ResetPasswordContent = (props: Props) => {
  return props.loader.spinning ? (
    <div style={{minHeight: 533}} />
  ) : (
    <div>
      <h1 className="cc--reset-password--header">Reset your password?</h1>

      <h3 className="cc--reset-password--sub-header">
        Enter a new password to reset your password.
      </h3>

      <Row>
        <Col md={{span: 16, offset: 4}}>
          <ResetPasswordForm
            {...props.fields}
            onChange={props.onFieldChange}
            onSubmit={props.onSubmit}
          />

          <Button
            data-testid="resetPasswordButton"
            disabled={!props.validForm}
            loading={props.loading}
            size="large"
            type="primary"
            block
            onClick={props.onSubmit}
          >
            Reset password
          </Button>
        </Col>
      </Row>

      <Copyright />
    </div>
  )
}

export default loader(ResetPasswordContent)
