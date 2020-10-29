import {useState} from 'react'

export default (originalState, transformFilters) => {
  const [filters, setFilters] = useState({
    ...originalState,
    applyFilters: false,
  })

  const resetFilters = () => setFilters({...originalState, applyFilters: true})

  const transformedFilters = transformFilters(filters)

  return {filters, transformedFilters, setFilters, resetFilters}
}
