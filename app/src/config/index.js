/* eslint-disable no-undef */
const env = process.env

export default {
  apiUrl: env.REACT_APP_API_URL,
  appUrl: env.REACT_APP_URL,
  authClient: {
    secret: env.REACT_APP_CLIENT_SECRET,
    name: env.REACT_APP_CLIENT_NAME,
  },
  cryptoKey: env.REACT_APP_CRYPTO_KEY,
  features: {
    loadingBar: env.REACT_APP_LOADING_BAR_ENABLED === 'true',
  },
  paypal: {
    scriptUrl: env.REACT_APP_PAYPAL_SCRIPT_URL,
    clientId: env.REACT_APP_PAYPAL_CLIENT_ID,
    clientSecret: env.REACT_APP_PAYPAL_CLIENT_SECRET,
  },
  version: env.REACT_APP_VERSION,
}
