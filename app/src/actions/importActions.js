import request from '@/api'
import {handleError} from '@/helpers'
import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/file'

export const importFile = async ({
  containerName,
  filename,
  mappedHeaders,
  type,
}) => {
  try {
    const user = getUserData()
    const body = {
      containerName,
      filename,
      headers: mappedHeaders,
      importType: type,
    }

    if (!user) {
      throw new Error('No user.')
    }

    body.createdBy = user.id

    const response = await request.post(`${mainPath}/import`, body)

    return response
  } catch (error) {
    handleError('Unable to import data. Please try again.', error)
    return null
  }
}
