import request from '../api'
import {handleError, formDataToBody, openNotification} from '../helpers'

import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/counselors'

export const loadCounselors = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Counselors. Please try again.', error)
    return null
  }
}

export const loadCounselorStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Counselor Stats. Please try again.', error)
    return null
  }
}

export const loadCounselor = async counselorId => {
  try {
    const response = await request.get(`${mainPath}/${counselorId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Counselor. Please try again.', error)
    return null
  }
}

export const saveCounselor = async counselor => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(counselor)

    body.cabinId = body.cabinId ? Number(body.cabinId) : null
    body.userId = Number(body.userId)
    body.createdBy = user.id

    if (counselor.id) {
      response = await request.put(`${mainPath}/${counselor.id.value}`, body)
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Counselor has been ${
        counselor.id ? 'updated' : 'added'
      } successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Counselor. Please try again.', error)
    return null
  }
}

export const deleteCounselor = async counselorId => {
  try {
    const response = await request.delete(`${mainPath}/${counselorId}`)

    openNotification('success', 'The Counselor has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Counselor. Please try again.', error)
    return null
  }
}
