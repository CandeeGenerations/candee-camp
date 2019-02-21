import {notificationActionTypes as types} from './actionTypes'

export const error = (message: string) => ({type: types.ERROR_MESSAGE, message})

export const clearErrors = () => ({type: types.CLEAR_ERRORS})

export const success = (message: string) => ({
  type: types.SUCCESS_MESSAGE,
  message,
})

export const clearSuccesses = () => ({type: types.CLEAR_SUCCESSES})
