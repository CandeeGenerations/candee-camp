import {notificationActionTypes as types} from '../actions/actionTypes'

const INITIAL_STATE = {
  errors: null,
  successes: null,
}

function notifications(state: {} = INITIAL_STATE, action: {}) {
  switch (action.type) {
    case types.ERROR_MESSAGE:
      return {...state, errors: [...(state.errors || []), action.message]}

    case types.CLEAR_ERRORS:
      return {...state, errors: null}

    case types.SUCCESS_MESSAGE:
      return {...state, successes: [...(state.successes || []), action.message]}

    case types.CLEAR_SUCCESSES:
      return {...state, successes: null}

    default:
      return state
  }
}

export default notifications
