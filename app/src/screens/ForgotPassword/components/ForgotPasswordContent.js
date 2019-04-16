import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Button} from 'antd'

import {NavItem} from '../../../components/Navigation'
import {Copyright} from '../../../components/Structure'
import DisabledButtonPopup from '../../../components/DisabledButtonPopup'

import ForgotPasswordForm from './ForgotPasswordForm'

import './forgotPasswordContent.scss'

const ForgotPasswordContent = props => (
  <div>
    <h1 className="cc--forgot-password--header">Forgot your password?</h1>

    <h3 className="cc--forgot-password--sub-header">
      Enter your email below, and we'll send you the reset link.
    </h3>

    <Row>
      <Col md={{span: 16, offset: 4}}>
        <ForgotPasswordForm
          {...props.fields}
          onChange={props.onFieldChange}
          onSubmit={props.onSubmit}
        />

        <DisabledButtonPopup fields={props.fields}>
          <Button
            data-testid="sendResetLinkButton"
            disabled={!props.validForm}
            loading={props.loading}
            size="large"
            type="primary"
            block
            onClick={props.onSubmit}
          >
            Send reset link
          </Button>
        </DisabledButtonPopup>

        <div className="cc--signin-link">
          <NavItem options={{reload: true}} routeName="signin">
            Back to sign in
          </NavItem>
        </div>
      </Col>
    </Row>

    <Copyright />
  </div>
)

ForgotPasswordContent.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  validForm: PropTypes.bool.isRequired,

  // functions
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ForgotPasswordContent
