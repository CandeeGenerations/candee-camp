import request from '@/api'
import {getUserData, pid} from '@/helpers/authHelpers'
import {handleError, openNotification, formDataToBody} from '@/helpers'

const mainPath = '/events'

export const loadEvents = async (filters = null) => {
  try {
    const config = {}

    if (filters) {
      config = {params: {...filters}}
    }

    const response = await request.get(pid(mainPath), config)

    return response
  } catch (error) {
    handleError('Unable to load the Events. Please try again.', error)
    throw new Error(error)
  }
}

export const loadEventsByIds = async (eventIds) => {
  try {
    const response = await request.get(
      pid(`${mainPath}/by-ids?eventIds=${eventIds.join('&eventIds=')}`),
    )

    return response
  } catch (error) {
    handleError('Unable to load the Events. Please try again.', error)
    return null
  }
}

export const loadEventsForRegistration = async (currentEventId) => {
  try {
    const response = await request.get(
      pid(
        `${mainPath}/for-registration${
          currentEventId ? `?currentEventId=${currentEventId}` : ''
        }`,
      ),
    )

    return response
  } catch (error) {
    handleError('Unable to load the Events. Please try again.', error)
    return null
  }
}

export const loadEventStats = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response.data.length
  } catch (error) {
    handleError('Unable to load the Event Stats. Please try again.', error)
    throw new Error(error)
  }
}

export const loadEvent = async (eventId: number) => {
  try {
    const response = await request.get(pid(`${mainPath}/${eventId}`))

    return response
  } catch (error) {
    handleError('Unable to load the Event. Please try again.', error)
    return null
  }
}

export const saveEvent = async (event) => {
  try {
    let response = null
    const user = getUserData()

    if (!user) {
      throw new Error('No user.')
    }

    event.startDate = {value: event.dateTime.value[0].format()}
    event.endDate = {value: event.dateTime.value[1].format()}

    const body = formDataToBody(event)

    body.createdBy = user.id

    if (event.id) {
      response = await request.put(pid(`${mainPath}/${event.id.value}`), body)
    } else {
      response = await request.post(pid(mainPath), body)
    }

    openNotification(
      'success',
      `The Event has been ${event.id ? 'updated' : 'added'} successfully.`,
    )

    return response
  } catch (error) {
    handleError('Unable to save the Event. Please try again.', error)
    return null
  }
}

export const deleteEvent = async (eventId) => {
  try {
    const response = await request.delete(pid(`${mainPath}/${eventId}`))

    openNotification('success', 'The Event has been deleted successfully.')

    return response
  } catch (error) {
    handleError('Unable to delete the Event. Please try again.', error)
    return null
  }
}
