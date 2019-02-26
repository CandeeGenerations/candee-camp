import merge from 'deepmerge'
import {notification} from 'antd'

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

export const formDataToBody = fields => {
  const returnObject = {}

  for (const key in fields) {
    if (fields[key]) {
      returnObject[key] = fields[key].value
    }
  }

  return returnObject
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

export const openNotification: void = (type: string, description: string) =>
  notification[type]({
    message: type === 'success' ? 'Success' : 'Error',
    description,
  })

export const handleError: void = (message: string, error: {}) => {
  if (error) {
    errorTrace(error)
  }

  openNotification('error', message)
}
