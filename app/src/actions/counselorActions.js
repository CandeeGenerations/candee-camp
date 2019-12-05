import request from '../api'
import {handleError} from '../helpers'

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
