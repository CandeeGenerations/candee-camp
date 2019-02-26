import React from 'react'
import {useTitle} from '../../helpers/hooks/useTitle'

export default () => {
  useTitle('Home')

  return (
    <section className="cc--main-content">
      <h1>Dashboard</h1>

      <p>More content coming soon.</p>
    </section>
  )
}
