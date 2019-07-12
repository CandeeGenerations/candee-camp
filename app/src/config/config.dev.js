const Config = {
  apiUrl: 'http://localhost:5000/api', // 'http://localhost:3001/.netlify/functions/server',
  cryptoKey: 'a9f3cd176403126642c142605ef08829',
  features: {
    loadingBar: false,
  },
  version: process.env.REACT_APP_VERSION,
}

export default Config
