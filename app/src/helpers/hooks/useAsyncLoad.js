import {useEffect, useState} from 'react'

export default (func, ...params) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(false)

  const replaceResultItem = (item, idField) =>
    setData({
      ...data,
      results: data.results.map(x => (x[idField] === item[idField] ? item : x)),
    })

  const load = async (keepLoading = false) => {
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
      if (!keepLoading) {
        setLoading(false)
        setIsLoading(false)
      }
    }

    return d
  }

  const startLoading = () => {
    setLoading(true)
    setIsLoading(true)
  }

  const stopLoading = () => {
    setLoading(false)
    setIsLoading(false)
  }

  useEffect(() => {
    if (reload && !isLoading) {
      load()
    }
  }, [reload, isLoading])

  return {
    data,
    load,
    loading,
    startLoading,
    stopLoading,
    setData,
    replaceResultItem,
  }
}
