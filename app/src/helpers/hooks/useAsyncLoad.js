import {useEffect, useState} from 'react'

export default (func, ...params) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(false)

  const load = async () => {
    let d = null

    if (isLoading) {
      setReload(true)
      return data
    }
    setReload(false)
    setLoading(true)
    setIsLoading(true)

    try {
      d = await func(...params)
      setData(d)
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false)
      setIsLoading(false)
    }

    return d
  }

  useEffect(() => {
    if (reload && !isLoading) {
      load()
    }
  }, [reload, isLoading])

  const stopLoading = () => setLoading(false)

  return {data, load, loading, stopLoading}
}
