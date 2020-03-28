/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Col, Row, Button} from 'antd'

import ForgotPasswordForm from './ForgotPasswordForm'

import {NavItem} from '@/components/Navigation'
import {Copyright} from '@/components/Structure'
import DisabledButtonPopup from '@/components/DisabledButtonPopup'

const ForgotPasswordContent = (props) => (
  <div>
    <h1
      css={{
        fontSize: 40,
        color: '#085eb0',
        margin: '20px 0',
        textAlign: 'center',
        fontFamily: "'Comfortaa', sans-serif",
      }}
    >
      Forgot your password?
    </h1>

    <h3 css={{textAlign: 'center', marginBottom: 50}}>
      Enter your email below, and we&apos;ll send you the reset link.
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

        <div
          css={{
            marginTop: 50,
            textAlign: 'center',
            a: {
              color: '#a3a3a3',
              '&:hover': {
                color: '#8a8a8a',
              },
            },
          }}
        >
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
