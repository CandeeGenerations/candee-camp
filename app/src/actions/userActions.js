import request from '../api'
import {handleError, openNotification, formDataToBody} from '../helpers'

export const loadUsers = async () => {
  try {
    const response = await request.get('/users')

    return response
  } catch (error) {
    handleError('Unable to load the Users. Please try again.', error)
    throw new Error(error)
  }
}

export const loadUserStats = async () => {
  try {
    const response = await request.get('/users')

    return response.data.length
  } catch (error) {
    handleError('Unable to load the User Stats. Please try again.', error)
    throw new Error(error)
  }
}

export const loadUser = async (userId: number) => {
  try {
    const response = await request.get(`/users/${userId}`)

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
      response = await request.put(`/users/${user.id.value}`, body)
    } else {
      response = await request.post('/users', body)
    }

    openNotification(
      'success',
      `The User has been ${user.eventId ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the User. Please try again.', error)
    return null
  }
}

export const deleteUser = async userId => {
  try {
    const response = await request.delete(`/users/${userId}`)

    openNotification('success', 'The User has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the User. Please try again.', error)
    return null
  }
}
