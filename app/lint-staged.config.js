module.exports = {
  linters: {
    'src/**/*.+(js|md|ts|css|sass|less|graphql|yml|yaml|json|vue)': [
      'prettier --write',
    ],
    'src/**/*.+(jse)': ['eslint'],
  },
}
