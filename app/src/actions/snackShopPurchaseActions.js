import request from '../api'
import {handleError, openNotification} from '../helpers'

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

export const loadSnackShopPurchase = async ({
  camperId,
  source,
  snackShopPurchaseId,
}) => {
  try {
    const response = await request.get(
      `${mainPath}/${camperId}/${snackShopPurchaseId}`,
      {params: {source}},
    )

    return response
  } catch (error) {
    handleError(
      'Unable to load the Snack Shop Purchase. Please try again.',
      error,
    )
    return null
  }
}

export const saveSnackShopPurchase = async ({
  camperId,
  source,
  snackShopPurchase,
}) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = {...snackShopPurchase}

    body.createdBy = user.id

    if (snackShopPurchase.id && snackShopPurchase.id !== 0) {
      response = await request.put(
        `${mainPath}/${camperId}/${snackShopPurchase.id}`,
        body,
        {params: {source}},
      )
    } else {
      response = await request.post(`${mainPath}/${camperId}`, body, {
        params: {source},
      })
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

export const deleteSnackShopPurchase = async ({
  camperId,
  source,
  snackShopPurchaseId,
}) => {
  try {
    const response = await request.delete(
      `${mainPath}/${camperId}/${snackShopPurchaseId}`,
      {params: {source}},
    )

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
