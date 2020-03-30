import jwtDecode from 'jwt-decode'

const key = 'reclaimed-user'

export const setUser = (value) =>
  localStorage.setItem(key, JSON.stringify(value))

export const getUser = () => {
  const user = localStorage.getItem(key)

  return user ? JSON.parse(user) : null
}

export const getUserData = () => {
  const user = getUser()

  if (!user) {
    return null
  }

  const userData = jwtDecode(user.access_token)

  return {
    ...userData,
    id: Number(
      userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
    ),
    emailAddress:
      userData[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ],
  }
}

export const removeUser = () => localStorage.removeItem(key)
