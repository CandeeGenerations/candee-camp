import request from '@/api'
import {getUserData, pid} from '@/helpers/authHelpers'
import {handleError, formDataToBody, openNotification} from '@/helpers'

const mainPath = '/counselors'

export const loadCounselors = async (filters = null) => {
  try {
    const config = {}

    if (filters) {
      config = {params: {...filters}}
    }

    const response = await request.get(pid(mainPath), config)

    return response
  } catch (error) {
    handleError('Unable to load the Counselors. Please try again.', error)
    return null
  }
}

export const loadCounselorStats = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Counselor Stats. Please try again.', error)
    return null
  }
}

export const loadCounselor = async (counselorId) => {
  try {
    const response = await request.get(pid(`${mainPath}/${counselorId}`))

    return response
  } catch (error) {
    handleError('Unable to load the Counselor. Please try again.', error)
    return null
  }
}

export const saveCounselor = async (counselor) => {
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
      response = await request.put(
        pid(`${mainPath}/${counselor.id.value}`),
        body,
      )
    } else {
      response = await request.post(pid(mainPath), body)
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

export const deleteCounselor = async (counselorId) => {
  try {
    const response = await request.delete(pid(`${mainPath}/${counselorId}`))

    openNotification('success', 'The Counselor has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Counselor. Please try again.', error)
    return null
  }
}
