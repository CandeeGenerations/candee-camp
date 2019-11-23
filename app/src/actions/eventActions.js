import request from '@/api'
import {getUserData} from '@/helpers/authHelpers'
import {handleError, openNotification, formDataToBody} from '@/helpers'

export const loadEvents = async () => {
  try {
    const response = await request.get('/events')

    return response
  } catch (error) {
    handleError('Unable to load the Events. Please try again.', error)
    throw new Error(error)
  }
}

export const loadEventStats = async () => {
  try {
    const response = await request.get('/events')

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Event Stats. Please try again.', error)
    throw new Error(error)
  }
}

export const loadEvent = async (eventId: number) => {
  try {
    const response = await request.get(`/events/${eventId}`)

    return response
  } catch (error) {
    handleError('Unable to load the Event. Please try again.', error)
    return null
  }
}

export const saveEvent = async event => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    event.startDate = {value: event.dateTime.value[0].utc().startOf('day')}
    event.endDate = {value: event.dateTime.value[1].utc().endOf('day')}

    const body = formDataToBody(event)

    body.createdBy = user.id

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
    handleError('Unable to save the Event. Please try again.', error)
    return null
  }
}

export const deleteEvent = async eventId => {
  try {
    const response = await request.delete(`/events/${eventId}`)

    openNotification('success', 'The Event has been deleted successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Event. Please try again.', error)
    return null
  }
}
