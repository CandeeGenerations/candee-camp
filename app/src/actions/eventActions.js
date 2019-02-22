import request from '../api'
import {handleError} from '../helpers'

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
    throw new Error(error)
  }
}
