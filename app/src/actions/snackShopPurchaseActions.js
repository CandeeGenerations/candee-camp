import request from '../api'
import {handleError, openNotification} from '../helpers'

import {getUserData, pid} from '@/helpers/authHelpers'

const mainPath = '/snack-shop-purchases'

export const loadSnackShopPurchases = async ({
  camperId,
  counselorId,
  source,
}) => {
  try {
    const response = await request.get(
      pid(`${mainPath}/${camperId || counselorId}`),
      {
        params: {source},
      },
    )

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
  counselorId,
  source,
  snackShopPurchaseId,
}) => {
  try {
    const response = await request.get(
      pid(`${mainPath}/${camperId || counselorId}/${snackShopPurchaseId}`),
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
  counselorId,
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
        pid(`${mainPath}/${camperId || counselorId}/${snackShopPurchase.id}`),
        body,
        {params: {source}},
      )
    } else {
      response = await request.post(
        pid(`${mainPath}/${camperId || counselorId}`),
        body,
        {
          params: {source},
        },
      )
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
  counselorId,
  source,
  snackShopPurchaseId,
}) => {
  try {
    const response = await request.delete(
      pid(`${mainPath}/${camperId || counselorId}/${snackShopPurchaseId}`),
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
