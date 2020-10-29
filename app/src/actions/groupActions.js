import request from '@/api'
import {getUserData, pid} from '@/helpers/authHelpers'
import {handleError, openNotification, formDataToBody} from '@/helpers'

const mainPath = '/groups'

export const loadGroups = async (filters = null) => {
  try {
    const config = {}

    if (filters) {
      config = {params: {...filters}}
    }

    const response = await request.get(pid(mainPath), config)

    return response
  } catch (error) {
    handleError('Unable to load the Groups. Please try again.', error)
    return null
  }
}

export const loadGroupStats = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Group Stats. Please try again.', error)
    return null
  }
}

export const loadGroup = async (groupId) => {
  try {
    const response = await request.get(pid(`${mainPath}/${groupId}`))

    return response
  } catch (error) {
    handleError('Unable to load the Group. Please try again.', error)
    return null
  }
}

export const saveGroup = async (group) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(group)

    body.createdBy = user.id
    body.campers = body.campers.map((x) => Number(x))
    body.loginUser = Number(body.loginUser)

    if (group.id) {
      response = await request.put(pid(`${mainPath}/${group.id.value}`), body)
    } else {
      response = await request.post(pid(mainPath), body)
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

export const deleteGroup = async (groupId) => {
  try {
    const response = await request.delete(pid(`${mainPath}/${groupId}`))

    openNotification('success', 'The Group has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Group. Please try again.', error)
    return null
  }
}
