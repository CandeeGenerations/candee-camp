import request from '../api'
import {removeUser, setUser} from '../helpers/authHelpers'

export const signin = async (fields: {}) => {
  try {
    const response = await request.post('/signin', {
      params: {
        email: fields.email.value,
        password: fields.password.value,
      },
    })

    setUser(response.result)
  } catch (error) {
    // handleError('Unable to Sign in. Please try again.', error, dispatch)
  }
}

export const signout = async () => {
  try {
    await request.post('/signout')

    removeUser()
  } catch (error) {
    // handleError('Unable to Sign out. Please try again.', error, dispatch)
  }
}

export const forgotPassword = async (fields: {}) => {
  try {
    await request.post('/forgotpassword', {
      params: {
        email: fields.email.value,
      },
    })

    // dispatch(
    //   notifications.success(
    //     'The reset link has been sent to your email address.',
    //   ),
    // )
  } catch (error) {
    // handleError(
    //   'Unable to send reset link. Please make sure your email address is correct.',
    //   error,
    //   dispatch,
    // )
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
    // handleError(
    //   (error && error.message) ||
    //     'This reset password token is invalid or has expired. Please try again later.',
    //   {},
    //   dispatch,
    // )

    return null
  }
}

export const resetPassword = async (fields: {}) => {
  try {
    await request.post('/resetpassword', {
      params: {password: fields.newPassword.value},
    })

    // dispatch(
    //   notifications.success(
    //     'Your password has been reset. You can now use your new password to signin.',
    //   ),
    // )
  } catch (error) {
    // handleError(
    //   'Unable to reset your password at this time. Please try again later.',
    //   error,
    //   dispatch,
    // )
  }
}
