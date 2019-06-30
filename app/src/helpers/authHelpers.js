const key = 'candee-camp-user'

export const setUser = value => localStorage.setItem(key, JSON.stringify(value))

export const getUser = () => {
  const user = localStorage.getItem(key)

  return user ? JSON.parse(user) : null
}

export const removeUser = () => localStorage.removeItem(key)
