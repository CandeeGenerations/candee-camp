export default (key) => ({
  value: localStorage.getItem(key),
  valueAsBool: localStorage.getItem(key) === 'true',
  remove: () => localStorage.removeItem(key),
  set: (value) => localStorage.setItem(key, value),
})
