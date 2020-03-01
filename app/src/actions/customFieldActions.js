import request from '../api'
import {handleError} from '../helpers'

const mainPath = '/customFields'

export const loadCustomFields = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Custom Fields. Please try again.', error)
    return null
  }
}
