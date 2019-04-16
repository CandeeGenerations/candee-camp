const {
  addLessLoader,
  fixBabelImports,
  override,
  useBabelRc,
} = require('customize-cra')

module.exports = override(
  useBabelRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // change importing css to less
  }),

  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: {'@primary-color': '#1DA57A'},
  }),
)
