import request from '../api'
import {handleError, formDataToBody, openNotification} from '../helpers'

import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/snack-shop-items'

export const loadSnackShopItems = async () => {
  try {
    const response = await request.get(mainPath)

    return response
  } catch (error) {
    handleError('Unable to load the Snack Shop Items. Please try again.', error)
    return null
  }
}

export const loadSnackShopItemStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError(
      'Unable to load the Snack Shop Item Stats. Please try again.',
      error,
    )
    return null
  }
}

export const loadSnackShopItem = async (snackShopItemId) => {
  try {
    const response = await request.get(`${mainPath}/${snackShopItemId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Snack Shop Item. Please try again.', error)
    return null
  }
}

export const saveSnackShopItem = async (snackShopItem) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(snackShopItem)

    body.createdBy = user.id

    if (snackShopItem.id) {
      response = await request.put(
        `${mainPath}/${snackShopItem.id.value}`,
        body,
      )
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Snack Shop Item has been ${
        snackShopItem.id ? 'updated' : 'added'
      } successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Snack Shop Item. Please try again.', error)
    return null
  }
}

export const deleteSnackShopItem = async (snackShopItemId) => {
  try {
    const response = await request.delete(`${mainPath}/${snackShopItemId}`)

    openNotification(
      'success',
      'The Snack Shop Item has been delete successfully.',
    )

    return response
  } catch (error) {
    handleError(
      'Unable to delete the Snack Shop Item. Please try again.',
      error,
    )
    return null
  }
}
