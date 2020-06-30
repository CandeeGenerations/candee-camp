import request from '@/api'
import {handleError, formDataToBody} from '@/helpers'
import {getUserData, pid} from '@/helpers/authHelpers'

const mainPath = '/register'

export const registerForEvent = async ({
  eventId,
  singleCamper,
  camper,
  camperCustomFields,
  group,
  groupCampers,
  paymentId,
}) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    if (singleCamper) {
      const body = formDataToBody(camper)

      body.medicine = body.medicine.length > 0 ? body.medicine.toString() : null
      body.allergies =
        body.allergies.length > 0 ? body.allergies.toString() : null
      body.paymentId = paymentId
      body.customFields = camperCustomFields

      response = await request.post(pid(`${mainPath}/${eventId}/camper`), body)
    } else {
      const body = {
        groupName: group.name.value,
        campers: groupCampers.map((x) => {
          const data = formDataToBody(x)

          data.medicine =
            data.medicine.length > 0 ? data.medicine.toString() : null
          data.allergies =
            data.allergies.length > 0 ? data.allergies.toString() : null
          data.paymentId = paymentId
          data.customFields = x.camperCustomFields

          return data
        }),
      }

      response = await request.post(pid(`${mainPath}/${eventId}/group`), body)
    }

    return response
  } catch (error) {
    handleError('Unable to register for the event. Please try again.', error)
    return null
  }
}
