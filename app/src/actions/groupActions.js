import request from '../api'
import {handleError, openNotification, formDataToBody} from '../helpers'

import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/groups'

export const loadGroups = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Groups. Please try again.', error)
    return null
  }
}

export const loadGroupStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Group Stats. Please try again.', error)
    return null
  }
}

export const loadGroup = async groupId => {
  try {
    const response = await request.get(`${mainPath}/${groupId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Group. Please try again.', error)
    return null
  }
}

export const saveGroup = async group => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(group)

    body.createdBy = user.id
    body.campers = body.campers.map(x => Number(x))

    if (group.id) {
      response = await request.put(`${mainPath}/${group.id.value}`, body)
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Group has been ${group.id ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Group. Please try again.', error)
    return null
  }
}

export const deleteGroup = async groupId => {
  try {
    const response = await request.delete(`${mainPath}/${groupId}`)

    openNotification('success', 'The Group has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Group. Please try again.', error)
    return null
  }
}
