import React from 'react'
import PropTypes from 'prop-types'
import {Divider, PageHeader as APageHeader} from 'antd'

const PageHeader = props => {
  return (
    <>
      <APageHeader
        breadcrumb={
          props.routes
            ? {
                routes: props.routes,
              }
            : null
        }
        extra={props.actions}
        title={props.title}
      />

      <Divider />
    </>
  )
}

PageHeader.defaultProps = {
  actions: null,
  routes: null,
}

PageHeader.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      breadcrumbName: PropTypes.string.isRequired,
    }),
  ),
  title: PropTypes.string.isRequired,
}

export default PageHeader