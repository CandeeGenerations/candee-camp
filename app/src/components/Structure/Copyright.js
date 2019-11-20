/** @jsx jsx */
import {jsx} from '@emotion/core'

export default () => (
  <div css={{marginTop: 50, textAlign: 'center'}}>
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
