const path = require('path')
const CracoAntDesignPlugin = require('craco-antd')

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, 'src/content/antd.less'),
      },
    },
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      Assets: path.resolve(__dirname, './src/assets'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1',
      },
    },
  },
}
