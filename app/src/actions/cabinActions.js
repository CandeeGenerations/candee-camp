import request from '../api'
import {handleError, formDataToBody, openNotification} from '../helpers'

import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/cabins'

export const loadCabins = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Cabins. Please try again.', error)
    return null
  }
}

export const loadCabinStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Cabin Stats. Please try again.', error)
    return null
  }
}

export const loadCabin = async (cabinId) => {
  try {
    const response = await request.get(`${mainPath}/${cabinId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Cabin. Please try again.', error)
    return null
  }
}

export const saveCabin = async (cabin) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(cabin)

    body.createdBy = user.id

    if (cabin.id) {
      response = await request.put(`${mainPath}/${cabin.id.value}`, body)
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Cabin has been ${cabin.id ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Cabin. Please try again.', error)
    return null
  }
}

export const deleteCabin = async (cabinId) => {
  try {
    const response = await request.delete(`${mainPath}/${cabinId}`)

    openNotification('success', 'The Cabin has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Cabin. Please try again.', error)
    return null
  }
}
