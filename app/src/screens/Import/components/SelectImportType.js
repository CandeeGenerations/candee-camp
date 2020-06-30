/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext} from 'react'
import {Divider, Select, Row, Col, Collapse, Button} from 'antd'

import {Constants} from '@/helpers/constants'

import {ImportContext} from '..'

const SelectImportType = () => {
  const {importState, setImportState} = useContext(ImportContext)

  const headers = Constants.Headers[importState.type]

  const handleDownloadDemoFile = () => {
    const csv = headers.join(',')
    const hiddenElement = document.createElement('a')

    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`
    hiddenElement.target = '_blank'
    hiddenElement.download = `${importState.type}-demo-import.csv`
    hiddenElement.click()
    hiddenElement.remove()
  }

  return (
    <>
      <h1>Select Import Type</h1>

      <p>
        The first step is to select which type of import your will be doing. You
        will then be able to view the available columns, download a demo import
        file, or proceed to uploading your import file.
      </p>

      <Divider />

      <Select
        css={{width: '100%'}}
        value={importState.type}
        onChange={(type) => setImportState({type})}
      >
        <Select.Option value={1}>Cabins</Select.Option>
        <Select.Option value={2}>Coupons</Select.Option>
      </Select>

      <Row css={{marginTop: 25}} gutter={32}>
        <Col span={12}>
          <Collapse bordered={false}>
            <Collapse.Panel header="Available Column Headers">
              <ul>
                {headers.map((header) => (
                  <li key={header}>{header}</li>
                ))}
              </ul>
            </Collapse.Panel>
          </Collapse>
        </Col>

        <Col span={12}>
          <h1>Download Demo Import File</h1>

          <Button onClick={handleDownloadDemoFile}>Download</Button>
        </Col>
      </Row>

      <Divider css={{marginTop: 25}} />

      <Button
        css={{float: 'right'}}
        type="primary"
        onClick={() => setImportState({current: importState.current + 1})}
      >
        Next Step
      </Button>
    </>
  )
}

export default SelectImportType
