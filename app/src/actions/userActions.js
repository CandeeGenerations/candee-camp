import request from '@/api'
import {handleError, openNotification, formDataToBody} from '@/helpers'

const mainPath = '/users'

export const loadUsers = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Users. Please try again.', error)
    return null
  }
}

export const loadUsersByIds = async userIds => {
  try {
    const response = await request.get(
      `${mainPath}/by-ids?userIds=${userIds.join('&userIds=')}`,
    )

    return response
  } catch (error) {
    handleError('Unable to load the Users. Please try again.', error)
    return null
  }
}

export const loadUserStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError('Unable to load the User Stats. Please try again.', error)
    return null
  }
}

export const loadUser = async userId => {
  try {
    const response = await request.get(`${mainPath}/${userId}`)

    return response
  } catch (error) {
    handleError('Unable to load the User. Please try again.', error)
    return null
  }
}

export const saveUser = async user => {
  try {
    let response = null
    const body = formDataToBody(user)

    if (user.id) {
      response = await request.put(`${mainPath}/${user.id.value}`, body)
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The User has been ${user.id ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the User. Please try again.', error)
    return null
  }
}

export const deleteUser = async userId => {
  try {
    const response = await request.delete(`${mainPath}/${userId}`)

    openNotification('success', 'The User has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the User. Please try again.', error)
    return null
  }
}

export const changeUserPassword = async (userId, password) => {
  try {
    const response = await request.post(
      `${mainPath}/${userId}/change-password?password=${password}`,
    )

    openNotification(
      'success',
      "The User's Password has been updated successfully.",
    )

    return response
  } catch (error) {
    handleError(
      "Unable to update this User's Password. Please try again.",
      error,
    )
    return null
  }
}
