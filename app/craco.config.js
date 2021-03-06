/* eslint-disable no-undef */
const path = require('path')
const CracoAntDesignPlugin = require('craco-antd')
const {whenDev, whenProd} = require('@craco/craco')

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, 'src/content/antd.less'),
      },
    },
  ],
  eslint: {
    configure: (eslintConfig) => {
      eslintConfig.extends = [path.join(__dirname, '.eslintrc')]

      return eslintConfig
    },
  },
  babel: {
    presets: ['@babel/preset-react'],
    plugins: [
      ...whenDev(
        () => [
          ['emotion', {sourceMap: true}],
          '@babel/plugin-proposal-optional-chaining',
        ],
        [],
      ),
      ...whenProd(
        () => [
          'emotion',
          '@babel/plugin-proposal-optional-chaining',
          [
            'transform-react-remove-prop-types',
            {
              mode: 'remove',
              removeImport: true,
              ignoreFilenames: ['node_modules'],
            },
          ],
        ],
        [],
      ),
    ],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      Assets: path.resolve(__dirname, './src/assets'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transformIgnorePatterns: ['/node_modules/(?!antd)/.+\\.js$'],
    },
  },
}
