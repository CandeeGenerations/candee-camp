/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Button, Divider, Typography} from 'antd'

import useLocalStorage from '@/helpers/hooks/useLocalStorage'

import {NavItem} from '@/components/Navigation'
import {Copyright} from '@/components/Structure'
import DisabledButtonPopup from '@/components/DisabledButtonPopup'

import SigninForm from './SigninForm'

const SigninContent = (props) => {
  const unauthorized = useLocalStorage('cc-unauthorized')

  return (
    <React.Fragment>
      <h1
        css={{
          fontSize: 60,
          fontWeight: 300,
          color: '#2b6d5a',
          margin: '20px 0',
          textAlign: 'center',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Sign in
      </h1>

      <h2 css={{textAlign: 'center'}}>
        Welcome back! We are happy you like Reclaimed.
      </h2>

      {unauthorized.valueAsBool && (
        <div css={{textAlign: 'center'}}>
          <Typography.Text type="warning">
            You have been signed out. Please log back in.
          </Typography.Text>
        </div>
      )}

      <Divider />

      <Row>
        <Col md={{span: 16, offset: 4}}>
          <SigninForm
            {...props.fields}
            onChange={props.onFieldChange}
            onSubmit={props.onSubmit}
          />

          <div css={{textAlign: 'right', marginBottom: 20}}>
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
    </React.Fragment>
  )
}

SigninContent.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  validForm: PropTypes.bool.isRequired,

  // functions
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SigninContent
