import axios from 'axios'
import moment from 'moment'
import jwtDecode from 'jwt-decode'

import Config from '@/config'
import {getUser, removeUser} from '@/helpers/authHelpers'

export const axiosRequest = axios.create({
  baseURL: Config.apiUrl,
  crossDomain: true,
})

export const validateToken = () => {
  const user = getUser()
  const tokenData = jwtDecode(user.access_token)
  const epochTime = new Date(0)

  epochTime.setUTCSeconds(tokenData.exp)

  const expired = moment().isAfter(moment(epochTime))

  if (expired) {
    removeUser()
    localStorage.setItem('cc-unauthorized', true)
    window.location.reload()
  }
}

const get = (...params) => {
  validateToken()

  return axiosRequest.get(...params)
}

const deleteRequest = (...params) => {
  validateToken()

  return axiosRequest.delete(...params)
}

const post = (...params) => {
  validateToken()

  return axiosRequest.post(...params)
}

const put = (...params) => {
  validateToken()

  return axiosRequest.put(...params)
}

const patch = (...params) => {
  validateToken()

  return axiosRequest.patch(...params)
}

export default {get, delete: deleteRequest, post, put, patch}
