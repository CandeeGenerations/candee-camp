import request from '../api'
import {handleError, openNotification, formDataToBody} from '../helpers'

export const loadEvents = async () => {
  try {
    const response = await request.get('/events')

    return response
  } catch (error) {
    handleError('Unable to load Events. Please try again.', error)
    throw new Error(error)
  }
}

export const loadEvent = async (eventId: number) => {
  try {
    const response = await request.get(`/events/${eventId}`)

    return response
  } catch (error) {
    handleError('Unable to load Event. Please try again.', error)
    return null
  }
}

export const saveEvent = async event => {
  try {
    let response = null
    const body = formDataToBody(event)

    if (event.id) {
      response = await request.put(`/events/${event.id.value}`, body)
    } else {
      response = await request.post('/events', body)
    }

    openNotification(
      'success',
      `The Event has been ${event.eventId ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save Event. Please try again.', error)
    return null
  }
}
