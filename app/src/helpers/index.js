import merge from 'deepmerge'
import {notificationActions as notifications} from '../actions'

const errorTrace = error => {
  console.error('Error :', error) // eslint-disable-line no-console

  return error
}

export const deepCopy = obj => merge(obj, {})

export const isFormReady: boolean = (fields: {}) => {
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const property = fields[key]

      if (
        property.isRequired &&
        (!property.value || (property.errors && property.errors.length > 0))
      ) {
        return false
      }
    }
  }

  return true
}

export const mergeFormData = (fields, data) => {
  const returnObject = deepCopy(fields)

  for (const key in data) {
    if (returnObject[key]) {
      returnObject[key].value = data[key]
    } else {
      returnObject[key] = {value: data[key]}
    }
  }

  return returnObject
}

export const handleError: void = (
  message: string,
  error: {},
  dispatch: () => void = null,
) => {
  if (error) {
    errorTrace(error)
  }

  if (typeof dispatch === 'function') {
    dispatch(notifications.error(message))
  }
}
