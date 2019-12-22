/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useContext} from 'react'
import {Upload, Icon, Divider, Button} from 'antd'

import {ImportContext} from '..'

import Config from '@/config'
import {handleError} from '@/helpers'
import {getUser, getUserData} from '@/helpers/authHelpers'

const UploadFile = () => {
  const userData = getUserData()
  const {importState, setImportState} = useContext(ImportContext)

  const user = getUser()
  const props = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    action: `${Config.apiUrl}/file/upload`,
    data: {userId: userData.id, importType: importState.type},
    headers: {Authorization: `Bearer ${user.access_token}`},
    onChange(info) {
      const {response, status} = info.file

      if (status === 'done') {
        setImportState({...response, current: importState.current + 1})
      } else if (status === 'error') {
        handleError(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <>
      <h1>Upload Import File</h1>

      <p>
        The next step is to upload your file. You will then be able to map your
        columns correctly based on the type of import you selected in the
        previous step.
      </p>

      <Divider />

      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>

        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>

        <p className="ant-upload-hint">Supported file types: .csv</p>
      </Upload.Dragger>

      <Divider css={{marginTop: 25}} />

      <Button
        onClick={() => setImportState({current: importState.current - 1})}
      >
        Previous Step
      </Button>
    </>
  )
}

export default UploadFile
