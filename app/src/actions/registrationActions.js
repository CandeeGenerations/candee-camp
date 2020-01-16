import request from '../api'
import {handleError, openNotification, formDataToBody} from '../helpers'

const mainPath = '/registrations'

export const loadRegistrations = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Registrations. Please try again.', error)
    return null
  }
}

export const loadRegistrationStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError(
      'Unable to load the Registration Stats. Please try again.',
      error,
    )
    return null
  }
}

export const loadRegistration = async registrationId => {
  try {
    const response = await request.get(`${mainPath}/${registrationId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Registration. Please try again.', error)
    return null
  }
}

export const saveRegistration = async registration => {
  try {
    let response = null
    const body = formDataToBody(registration)

    body.eventId = body.eventId ? Number(body.eventId) : null
    body.camperId = body.camperId ? Number(body.camperId) : null

    if (registration.id) {
      response = await request.put(`${mainPath}/${registration.id.value}`, body)
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Registration has been ${
        registration.id ? 'updated' : 'added'
      } successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Registration. Please try again.', error)
    return null
  }
}

export const deleteRegistration = async registrationId => {
  try {
    const response = await request.delete(`${mainPath}/${registrationId}`)

    openNotification(
      'success',
      'The Registration has been delete successfully.',
    )

    return response
  } catch (error) {
    handleError('Unable to delete the Registration. Please try again.', error)
    return null
  }
}
