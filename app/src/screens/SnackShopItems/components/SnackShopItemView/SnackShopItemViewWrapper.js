import React from 'react'
import PropTypes from 'prop-types'

import SnackShopItemForm from './SnackShopItemForm'

import loader from '@/components/Structure/Loader'

const SnackShopItemViewWrapper = props => {
  return props.loader.spinning ? null : (
    <>
      <p>
        {props.fields.id
          ? 'Edit this snack shop item here.'
          : 'Add a new snack shop item here.'}
      </p>

      <SnackShopItemForm
        {...props.fields}
        onChange={props.onFieldChange}
        onDeleteSnackShopItem={props.onDeleteSnackShopItem}
      />
    </>
  )
}

SnackShopItemViewWrapper.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // functions
  onDeleteCabin: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default loader(SnackShopItemViewWrapper)
