import Cookies from 'js-cookie'

const COOKIE_NAME: string = 'candee-camp-user'

export function setUser(key: string): void {
  Cookies.set(COOKIE_NAME, key)
}

export function getUser(): string {
  const cookie: string = Cookies.get(COOKIE_NAME)

  return cookie ? cookie : null
}

export function removeUser(): void {
  Cookies.remove(COOKIE_NAME)
}
