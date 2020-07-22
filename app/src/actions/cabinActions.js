import request from '@/api'
import {getUserData, pid} from '@/helpers/authHelpers'
import {handleError, formDataToBody, openNotification} from '@/helpers'

const mainPath = '/cabins'

export const loadCabins = async (filters = null) => {
  try {
    const config = {}

    if (filters) {
      config = {params: {...filters}}
    }

    const response = await request.get(pid(mainPath), config)

    return response
  } catch (error) {
    handleError('Unable to load the Cabins. Please try again.', error)
    return null
  }
}

export const loadCabinStats = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Cabin Stats. Please try again.', error)
    return null
  }
}

export const loadCabin = async (cabinId) => {
  try {
    const response = await request.get(pid(`${mainPath}/${cabinId}`))

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
      response = await request.put(pid(`${mainPath}/${cabin.id.value}`), body)
    } else {
      response = await request.post(pid(mainPath), body)
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
    const response = await request.delete(pid(`${mainPath}/${cabinId}`))

    openNotification('success', 'The Cabin has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Cabin. Please try again.', error)
    return null
  }
}
