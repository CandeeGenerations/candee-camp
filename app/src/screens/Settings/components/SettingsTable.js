/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import {splitCamelCase} from '@/helpers'
import {Constants} from '@/helpers/constants'
import {settingActions as actions} from '@/actions'

import loader from '@/components/Structure/Loader'

import SettingCell from './SettingCell'
import EditableSettingRow from './EditableSettingRow'

const SettingsTable = (props) => {
  const handleSave = async (row) => {
    const response = await actions.saveSetting(row.key, row.value)

    if (response) {
      props.refreshTable()
    }
  }

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      render: (text) => splitCamelCase(text),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      editable: true,
      width: '60%',
    },
  ]

  const components = {
    body: {
      row: EditableSettingRow,
      cell: SettingCell,
    },
  }

  const tableColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : (
    <Table
      columns={tableColumns}
      components={components}
      dataSource={props.settings}
      pagination={Constants.TableOptions.PaginationOptions}
      rowClassName="editable-row"
    />
  )
}

SettingsTable.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ),
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,
}

export default loader(SettingsTable)
