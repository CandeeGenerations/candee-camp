import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Button} from 'antd'

import {NavItem} from '../../../components/Navigation'
import {Copyright} from '../../../components/Structure'
import DisabledButtonPopup from '../../../components/DisabledButtonPopup'

import SigninForm from './SigninForm'

import './signinContent.scss'

const SigninContent = props => (
  <div>
    <h1 className="cc--signin--header">Sign in</h1>

    <h2 className="cc--signin--sub-header">
      Welcome back! We are happy you like Candee Camp.
    </h2>

    <Row>
      <Col md={{span: 16, offset: 4}}>
        <SigninForm
          {...props.fields}
          onChange={props.onFieldChange}
          onSubmit={props.onSubmit}
        />

        <div className="cc--forgot-password-link">
          <NavItem options={{reload: true}} routeName="forgotPassword">
            Forgot password?
          </NavItem>
        </div>

        <DisabledButtonPopup fields={props.fields}>
          <Button
            data-testid="signinButton"
            disabled={!props.validForm}
            loading={props.loading}
            size="large"
            type="primary"
            block
            onClick={props.onSubmit}
          >
            Sign in
          </Button>
        </DisabledButtonPopup>
      </Col>
    </Row>

    <Copyright />
  </div>
)

SigninContent.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  validForm: PropTypes.bool.isRequired,

  // functions
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SigninContent
