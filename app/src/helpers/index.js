import merge from 'deepmerge'
import {notification} from 'antd'

const errorTrace = error => {
  console.error('Error :', error) // eslint-disable-line no-console

  return error
}

export const deepCopy = obj => merge(obj, {})

export const splitCamelCase = str =>
  str.replace(/([A-Z])/g, ' $1').toLowerCase()

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

export const percentComplete = (fields: {}) => {
  let fieldCount = 0
  let validFields = 0

  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const property = fields[key]

      if (property.includePercent) {
        fieldCount++

        if (
          !property.isRequired ||
          (property.value && (!property.errors || property.errors.length === 0))
        ) {
          validFields++
        }
      }
    }
  }

  return fieldCount === 0 ? 0 : (validFields / fieldCount) * 100
}

export const formErrors = (fields: {}) => {
  const errors = []
  let touched = false

  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const property = fields[key]

      touched = touched || (property.touched || false)

      if (property.errors && property.errors.length > 0) {
        property.errors.forEach(({message}) =>
          errors.push({message, type: 'error'}),
        )
      } else if (
        property.isRequired &&
        (property.value === undefined ||
          property.value === null ||
          property.value === '')
      ) {
        errors.push({
          message: `The ${splitCamelCase(key)} field is required.`,
          type: 'error',
        })
      }
    }
  }

  if (errors.length === 0 && !touched) {
    errors.push({message: 'There is nothing to update yet.', type: 'warning'})
  }

  return errors
}

export const anyTouchedFields = (fields: {}) => {
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const property = fields[key]

      if (property.touched) {
        return true
      }
    }
  }

  return false
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
