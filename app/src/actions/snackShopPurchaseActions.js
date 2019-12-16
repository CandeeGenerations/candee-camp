import request from '../api'
import {handleError, formDataToBody, openNotification} from '../helpers'

import {getUserData} from '@/helpers/authHelpers'

const mainPath = '/snack-shop-purchases'

export const loadSnackShopPurchases = async ({camperId, source}) => {
  try {
    const response = await request.get(`${mainPath}/${camperId}`, {
      params: {source},
    })

    return response
  } catch (error) {
    handleError(
      'Unable to load the Snack Shop Purchases. Please try again.',
      error,
    )
    return null
  }
}

export const loadSnackShopPurchaseStats = async () => {
  try {
    const response = await request.get(mainPath)

    return response.data.length
  } catch (error) {
    handleError(
      'Unable to load the Snack Shop Purchase Stats. Please try again.',
      error,
    )
    return null
  }
}

export const loadSnackShopPurchase = async snackShopPurchaseId => {
  try {
    const response = await request.get(`${mainPath}/${snackShopPurchaseId}`)

    return response
  } catch (error) {
    handleError(
      'Unable to load the Snack Shop Purchase. Please try again.',
      error,
    )
    return null
  }
}

export const saveSnackShopPurchase = async snackShopPurchase => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(snackShopPurchase)

    body.createdBy = user.id

    if (snackShopPurchase.id) {
      response = await request.put(
        `${mainPath}/${snackShopPurchase.id.value}`,
        body,
      )
    } else {
      response = await request.post(mainPath, body)
    }

    openNotification(
      'success',
      `The Snack Shop Purchase has been ${
        snackShopPurchase.id ? 'updated' : 'added'
      } successfully.`,
    )

    return response
  } catch (error) {
    handleError(
      'Unable to save the Snack Shop Purchase. Please try again.',
      error,
    )
    return null
  }
}

export const deleteSnackShopPurchase = async snackShopPurchaseId => {
  try {
    const response = await request.delete(`${mainPath}/${snackShopPurchaseId}`)

    openNotification(
      'success',
      'The Snack Shop Purchase has been delete successfully.',
    )

    return response
  } catch (error) {
    handleError(
      'Unable to delete the Snack Shop Purchase. Please try again.',
      error,
    )
    return null
  }
}
