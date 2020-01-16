/* eslint-disable no-undef */
const env = process.env

export default {
  appUrl: env.REACT_APP_URL,
  apiUrl: env.REACT_APP_API_URL,
  cryptoKey: env.REACT_APP_CRYPTO_KEY,
  features: {
    loadingBar: env.REACT_APP_LOADING_BAR_ENABLED === 'true',
  },
  version: env.REACT_APP_VERSION,
}
