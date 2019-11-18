const env = process.env

export default {
  apiUrl: env.REACT_APP_API_URL,
  cryptoKey: env.REACT_APP_CRYPTO_KEY,
  features: {
    loadingBar: env.REACT_APP_LOADING_BAR_ENABLED,
  },
  version: env.REACT_APP_VERSION,
}
