import React from 'react'
import {Col, Row, Button} from 'antd'

import {NavItem} from '../../../components/Navigation'
import {Copyright} from '../../../components/Structure'
import SigninForm from './SigninForm'

import './signinContent.scss'

type Props = {
  fields: {},
  loading: boolean,
  validForm: boolean,

  // functions
  onFieldChange: () => void,
  onSubmit: () => void,
}

const SigninContent = (props: Props) => (
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
      </Col>
    </Row>

    <Copyright />
  </div>
)

export default SigninContent
