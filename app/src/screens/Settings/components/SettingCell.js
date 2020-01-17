/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Input, Form} from 'antd'
import PropTypes from 'prop-types'
import React, {useRef, useState} from 'react'

import {EditableSettingsContext} from './EditableSettingRow'

const SettingCell = props => {
  const inputEl = useRef(null)
  const [editing, setEditing] = useState(false)
  const [savedForm, setSavedForm] = useState(null)

  const toggleEdit = async () => {
    const newEditing = !editing

    await setEditing(newEditing)

    if (newEditing) {
      inputEl.current.focus()
    }
  }

  const save = e => {
    const {record, handleSave} = props

    savedForm.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }

      toggleEdit()
      handleSave({...record, ...values})
    })
  }

  const renderCell = form => {
    setSavedForm(form)

    const {children, dataIndex, record, title} = props

    return editing ? (
      <Form.Item style={{margin: 0}}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={inputEl} onBlur={save} onPressEnter={save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{paddingRight: 24}}
        onClick={toggleEdit}
      >
        {record.sensitive ? (
          <>
            &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
          </>
        ) : (
          children
        )}
      </div>
    )
  }

  // eslint-disable-next-line no-unused-vars
  const {editable, children, dataIndex, handleSave, ...restProps} = props

  return (
    <td {...restProps}>
      {editable ? (
        <EditableSettingsContext.Consumer>
          {renderCell}
        </EditableSettingsContext.Consumer>
      ) : (
        children
      )}
    </td>
  )
}

SettingCell.propTypes = {
  children: PropTypes.node,
  dataIndex: PropTypes.string,
  editing: PropTypes.bool,
  record: PropTypes.object,
  title: PropTypes.string,
}

export default SettingCell
