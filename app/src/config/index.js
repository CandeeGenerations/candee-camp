import qaConfig from './config.qa'
import devConfig from './config.dev'
import prodConfig from './config.production'

const ENV = process.env.NODE_ENV

function getEnv(envStr) {
  switch (envStr) {
    case 'production':
      return prodConfig

    case 'qa':
      return qaConfig

    default:
      return devConfig
  }
}

const Config = getEnv(ENV)

export default Config
