import devConfig from './config.dev'
import prodConfig from './config.production'

const ENV = process.env.NODE_ENV

function getEnv(envStr) {
  switch (envStr) {
    case 'production':
      return prodConfig

    default:
      return devConfig
  }
}

const Config = getEnv(ENV)

export default Config
