import React from 'react'
import _ from 'lodash'
import dayjs from 'dayjs'
import merge from 'deepmerge'
import {notification, Tag} from 'antd'

import {Constants} from './constants'

const errorTrace = (error, response) => {
  console.error(error, response) // eslint-disable-line no-console

  return error
}

export const deepCopy = obj => merge(obj, {})

export const formatDate = date =>
  date ? dayjs(date).format('MMM D, YYYY h:mm A') : <em>None</em>

export const formatRole = role => {
  let color = null
  let name = 'None'

  switch (role) {
    case Constants.Roles.FullAdmin:
      color = 'purple'
      name = 'Full Admin'
      break

    case Constants.Roles.Admin:
      color = 'red'
      name = 'Admin'
      break

    case Constants.Roles.Manager:
      color = 'blue'
      name = 'Manager'
      break

    case Constants.Roles.ReadOnly:
      color = 'green'
      name = 'Ready Only'
      break

    default:
      color = null
      name = 'none'
      break
  }

  return <Tag color={color}>{name}</Tag>
}

export const splitCamelCase = str => str.replace(/([A-Z])/g, ' $1').trim()

export const rolesList = () => {
  const roles = []

  _.keys(Constants.Roles).forEach(key => {
    roles.push({text: splitCamelCase(key), value: Constants.Roles[key]})
  })

  return roles
}

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
          message: `The ${splitCamelCase(
            key,
          ).toLowerCase()} field is required.`,
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
    errorTrace(error, error.response || null)
  }

  const msg =
    (error &&
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message) ||
    message

  openNotification('error', msg)
}
