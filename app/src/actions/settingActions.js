import request from '@/api'
import {pid} from '@/helpers/authHelpers'
import {handleError, openNotification} from '@/helpers'

const mainPath = '/settings'

export const loadSettings = async () => {
  try {
    const response = await request.get(pid(mainPath))

    return response
  } catch (error) {
    handleError('Unable to load the Settings. Please try again.', error)
    return null
  }
}

export const loadSetting = async (key) => {
  try {
    const response = await request.get(pid(`${mainPath}/${key}`))

    return response
  } catch (error) {
    handleError('Unable to load the Setting. Please try again.', error)
    return null
  }
}

export const saveSetting = async (key, value) => {
  try {
    let response = null

    response = await request.put(pid(`${mainPath}/${key}?value=${value}`))

    openNotification('success', 'The Setting has been updated successfully.')

    return response
  } catch (error) {
    handleError('Unable to save the Setting. Please try again.', error)
    return null
  }
}

export const saveSettings = async (settings) => {
  try {
    let response = null

    response = await request.put(pid(mainPath), settings)

    openNotification('success', 'The Settings has been updated successfully.')

    return response
  } catch (error) {
    handleError('Unable to save the Settings. Please try again.', error)
    return null
  }
}
