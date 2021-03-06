/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Button, Col, Row} from 'antd'

import {Copyright} from '@/components/Structure'
import loader from '@/components/Structure/Loader'
import DisabledButtonPopup from '@/components/DisabledButtonPopup'

import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordContent = (props) =>
  props.loader.spinning ? (
    <div css={{minHeight: 533}} />
  ) : (
    <div>
      <h1
        css={{
          fontSize: 40,
          fontWeight: 300,
          color: '#2b6d5a',
          margin: '20px 0',
          textAlign: 'center',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Reset your password?
      </h1>

      <h3
        css={{
          marginBottom: 50,
          textAlign: 'center',
        }}
      >
        Enter a new password to reset your password.
      </h3>

      <Row>
        <Col md={{span: 16, offset: 4}}>
          <ResetPasswordForm
            {...props.fields}
            onChange={props.onFieldChange}
            onSubmit={props.onSubmit}
          />

          <DisabledButtonPopup fields={props.fields}>
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
          </DisabledButtonPopup>
        </Col>
      </Row>

      <Copyright />
    </div>
  )

ResetPasswordContent.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  validForm: PropTypes.bool.isRequired,

  // functions
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default loader(ResetPasswordContent)
