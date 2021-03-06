import request from '@/api'
import {handleError} from '@/helpers'
import {pid} from '@/helpers/authHelpers'

const mainPath = '/payments/paypal'

export const savePayment = async (payment) => {
  try {
    return await request.post(pid(mainPath), payment)
  } catch (error) {
    handleError('Unable to save the payment. Please try again.', error)
    return null
  }
}
