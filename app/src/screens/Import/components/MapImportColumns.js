/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext, useEffect} from 'react'
import {Divider, Button, Alert, Row, Col, Icon, Select} from 'antd'

import {Constants} from '@/helpers/constants'

import {ImportContext} from '..'

const MapImportColumns = () => {
  const {importState, setImportState} = useContext(ImportContext)

  const {errors, headers: importedHeaders, mappedHeaders} = importState
  const headers = Constants.Headers[importState.type]

  useEffect(() => {
    const newHeaders = []

    headers.forEach((header) => {
      const filteredHeader = importedHeaders.filter(
        (x) => x.toLowerCase().trim() === header.toLowerCase(),
      )

      newHeaders.push({
        header,
        value: filteredHeader.length > 0 ? filteredHeader[0] : 'none',
      })
    })

    setImportState({mappedHeaders: newHeaders})
  }, [])

  const handleHeaderChange = (value, header) => {
    const newHeaders = mappedHeaders.map((x) => {
      if (x.header === header) {
        x.value = value
      }

      return x
    })

    setImportState({mappedHeaders: newHeaders})
  }

  return (
    <>
      {errors && (
        <Alert
          css={{marginBottom: 25, maxHeight: 250, overflowY: 'auto'}}
          description={
            <>
              <p>
                <strong>The following errors occurred:</strong>
              </p>

              <ul>
                {errors.map((error) => (
                  <li>
                    <strong>Line {error.lineNumber}:</strong> {error.message}
                  </li>
                ))}
              </ul>
            </>
          }
          type="error"
        />
      )}

      <h1>Map the Columns</h1>

      <p>
        If the column headers for your import file don't match the headers in
        step 1, you can map the correct columns here. Then we will import the
        contents of your file into the system.
      </p>

      <Alert
        description="If your headers already match the headers from step 1, you can skip this step. Just press the Next Step button at the bottom."
        message="Note"
        type="info"
        showIcon
      />

      <Divider />

      {headers.map((header) => (
        <Row
          key={header}
          align="middle"
          css={{marginTop: 5}}
          gutter={16}
          justify="center"
          type="flex"
        >
          <Col css={{textAlign: 'right', verticalAlign: 'middle'}} span={8}>
            {header}
          </Col>

          <Col css={{textAlign: 'center', verticalAlign: 'middle'}} span={2}>
            <Icon type="arrow-right" />
          </Col>

          <Col span={12}>
            <Select
              css={{width: '100%'}}
              value={
                (mappedHeaders.length > 0 &&
                  mappedHeaders.find((x) => x.header === header).value) ||
                ''
              }
              onChange={(value) => handleHeaderChange(value, header)}
            >
              <Select.Option value="none">None</Select.Option>

              {importedHeaders.map((iHeader) => (
                <Select.Option key={iHeader} value={iHeader}>
                  {iHeader}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      ))}

      <Divider css={{marginTop: 25}} />

      <Button
        onClick={() => setImportState({current: importState.current - 1})}
      >
        Previous Step
      </Button>

      <Button
        css={{float: 'right'}}
        type="primary"
        onClick={() =>
          setImportState({current: importState.current + 1, loading: true})
        }
      >
        Import Data
      </Button>
    </>
  )
}

export default MapImportColumns
