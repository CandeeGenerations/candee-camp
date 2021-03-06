import request from '@/api'
import {getUserData, pid} from '@/helpers/authHelpers'
import {handleError, formDataToBody, openNotification} from '@/helpers'

const mainPath = '/customFields'

export const loadCustomFields = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response
  } catch (error) {
    handleError('Unable to load the Custom Fields. Please try again.', error)
    return null
  }
}

export const loadCustomFieldStats = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response.data.length
  } catch (error) {
    handleError(
      'Unable to load the Custom Field Stats. Please try again.',
      error,
    )
    return null
  }
}

export const loadCustomField = async (customFieldId) => {
  try {
    const response = await request.get(pid(`${mainPath}/${customFieldId}`))

    return response
  } catch (error) {
    handleError('Unable to load the Custom Field. Please try again.', error)
    return null
  }
}

export const saveCustomField = async (customField) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(customField)

    body.createdBy = user.id

    if (customField.id) {
      response = await request.put(
        pid(`${mainPath}/${customField.id.value}`),
        body,
      )
    } else {
      response = await request.post(pid(mainPath), body)
    }

    openNotification(
      'success',
      `The Custom Field has been ${
        customField.id ? 'updated' : 'added'
      } successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Custom Field. Please try again.', error)
    return null
  }
}

export const deleteCustomField = async (customFieldId) => {
  try {
    const response = await request.delete(pid(`${mainPath}/${customFieldId}`))

    openNotification(
      'success',
      'The Custom Field has been delete successfully.',
    )

    return response
  } catch (error) {
    handleError('Unable to delete the Custom Field. Please try again.', error)
    return null
  }
}

export const reorderCustomFields = async (sourceId, targetId) => {
  try {
    const response = await request.post(
      pid(`${mainPath}/reorder?sourceId=${sourceId}&targetId=${targetId}`),
    )

    openNotification(
      'success',
      'The Custom Fields have been reordered successfully.',
    )

    return response
  } catch (error) {
    handleError('Unable to reorder the Custom Fields. Please try again.', error)
    return null
  }
}
