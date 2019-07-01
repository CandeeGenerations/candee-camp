import qs from 'qs'

import request from '../api'
import {setUser} from '../helpers/authHelpers'
import {handleError, openNotification} from '../helpers'

export const signin = async (fields: {}) => {
  try {
    const response = await request.post(
      '/token',
      qs.stringify({
        // eslint-disable-next-line babel/camelcase
        grant_type: 'password',
        username: fields.email.value,
        password: fields.password.value,
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      },
    )

    setUser(response.data)
    localStorage.removeItem('cc-unauthorized')
  } catch (error) {
    handleError('Unable to Sign in. Please try again.', error)
  }
}

export const forgotPassword = async (fields: {}) => {
  try {
    await request.post('/forgotpassword', {
      params: {
        email: fields.email.value,
      },
    })

    openNotification(
      'success',
      'The reset link has been sent to your email address.',
    )
  } catch (error) {
    handleError(
      'Unable to send reset link. Please make sure your email address is correct.',
      error,
    )
  }
}

export const validateResetPasswordToken = async (token: string) => {
  try {
    if (!token) {
      throw new Error(
        'This reset password token is missing. Please click the link in your email again.',
      )
    }

    return await request.post('/validateresetpasswordtoken', {
      params: {token},
    })
  } catch (error) {
    handleError(
      (error && error.message) ||
        'This reset password token is invalid or has expired. Please try again later.',
      {},
    )

    return null
  }
}

export const resetPassword = async (fields: {}) => {
  try {
    await request.post('/resetpassword', {
      params: {password: fields.newPassword.value},
    })

    openNotification(
      'success',
      'Your password has been reset. You can now use your new password to signin.',
    )
  } catch (error) {
    handleError(
      'Unable to reset your password at this time. Please try again later.',
      error,
    )
  }
}
