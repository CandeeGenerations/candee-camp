import React from 'react'
import {Collapse, Icon} from 'antd'
import PropTypes from 'prop-types'

const Filter = (props) => {
  return (
    <Collapse
      bordered={false}
      expandIcon={({isActive}) => (
        <Icon rotate={isActive ? 90 : 0} type="caret-right" />
      )}
    >
      <Collapse.Panel
        header="Search & Filters"
        style={{
          background: '#f0f2f5',
          borderRadius: 15,
          marginBottom: 24,
          border: 0,
          overflow: 'hidden',
        }}
      >
        {props.children}
      </Collapse.Panel>
    </Collapse>
  )
}

Filter.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Filter
