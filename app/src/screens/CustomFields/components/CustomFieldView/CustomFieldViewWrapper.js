/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'

import loader from '@/components/Structure/Loader'

import CustomFieldForm from './CustomFieldForm'

const CustomFieldViewWrapper = (props) => {
  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : (
    <React.Fragment>
      <p>
        {props.fields.id
          ? 'Edit this custom field here.'
          : 'Add a new custom field here.'}
      </p>

      <CustomFieldForm
        {...props.fields}
        onChange={props.onFieldChange}
        onDeleteCustomField={props.onDeleteCustomField}
      />
    </React.Fragment>
  )
}

CustomFieldViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteCustomField: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CustomFieldViewWrapper)
