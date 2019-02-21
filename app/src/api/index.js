import axios from 'axios'
import Config from '../config'

const request = axios.create({
  baseURL: Config.apiUrl,
  crossDomain: true,
})

export default request
