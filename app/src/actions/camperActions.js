import request from '../api'
import {handleError, openNotification, formDataToBody} from '../helpers'

import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/campers'

export const loadCampers = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Campers. Please try again.', error)
    return null
  }
}

export const loadCamperStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Camper Stats. Please try again.', error)
    return null
  }
}

export const loadCamper = async camperId => {
  try {
    const response = await request.get(`${mainPath}/${camperId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Camper. Please try again.', error)
    return null
  }
}

export const saveCamper = async camper => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(camper)

    body.medicine = body.medicine.length > 0 ? body.medicine.toString() : null
    body.allergies =
      body.allergies.length > 0 ? body.allergies.toString() : null
    body.createdBy = user.id

    if (camper.id) {
      response = await request.put(`${mainPath}/${camper.id.value}`, body)
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Camper has been ${camper.id ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Camper. Please try again.', error)
    return null
  }
}

export const deleteCamper = async camperId => {
  try {
    const response = await request.delete(`${mainPath}/${camperId}`)

    openNotification('success', 'The Camper has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Camper. Please try again.', error)
    return null
  }
}