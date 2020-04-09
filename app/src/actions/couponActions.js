import request from '../api'
import {handleError, formDataToBody, openNotification} from '../helpers'

import {getUserData, pid} from '@/helpers/authHelpers'

const mainPath = '/coupons'

export const loadCoupons = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response
  } catch (error) {
    handleError('Unable to load the Coupons. Please try again.', error)
    return null
  }
}

export const loadCouponStats = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Coupon Stats. Please try again.', error)
    return null
  }
}

export const loadCoupon = async (couponId) => {
  try {
    const response = await request.get(pid(`${mainPath}/${couponId}`))

    return response
  } catch (error) {
    handleError('Unable to load the Coupon. Please try again.', error)
    return null
  }
}

export const loadCouponByCode = async (code) => {
  try {
    const response = await request.get(pid(`${mainPath}/code?code=${code}`))

    return response
  } catch (error) {
    handleError('Unable to load the Coupon. Please try again.', error)
    return null
  }
}

export const saveCoupon = async (coupon) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    const body = formDataToBody(coupon)

    body.createdBy = user.id
    body.type = Number(body.type)

    if (body.type === 2) {
      body.amount = body.amount / 100
    }

    if (coupon.id) {
      response = await request.put(pid(`${mainPath}/${coupon.id.value}`), body)
    } else {
      response = await request.post(pid(mainPath), body)
    }

    openNotification(
      'success',
      `The Coupon has been ${coupon.id ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Coupon. Please try again.', error)
    return null
  }
}

export const deleteCoupon = async (couponId) => {
  try {
    const response = await request.delete(pid(`${mainPath}/${couponId}`))

    openNotification('success', 'The Coupon has been delete successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Coupon. Please try again.', error)
    return null
  }
}
