import React from 'react'
import PropTypes from 'prop-types'

import CounselorForm from './CounselorForm'

import loader from '@/components/Structure/Loader'

const CounselorViewWrapper = props => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id
          ? 'Edit this counselor here.'
          : 'Add a new counselor here.'}
      </p>

      <CounselorForm
        {...props.fields}
        usersList={props.usersList}
        onChange={props.onFieldChange}
        onDeleteCounselor={props.onDeleteCounselor}
      />
    </>
  )
}

CounselorViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
  usersList: PropTypes.array.isRequired,

  // functions
  onDeleteCounselor: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(CounselorViewWrapper)
