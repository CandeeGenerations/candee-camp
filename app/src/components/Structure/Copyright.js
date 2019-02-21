import React from 'react'

import './copy.scss'

export default () => (
  <div className="cc--copy">
    <small>
      &copy; 2017 - {new Date().getFullYear()}{' '}
      <a
        href="https://candeegenerations.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        Candee Generations
      </a>
      , LLC. All Rights Reserved.
    </small>
  </div>
)
