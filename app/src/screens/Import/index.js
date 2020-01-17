import React, {useEffect, useReducer} from 'react'
import {Row, Col, Steps, Card} from 'antd'

import Importing from './components/Importing'
import UploadFile from './components/UploadFile'
import SelectImportType from './components/SelectImportType'
import MapImportColumns from './components/MapImportColumns'

import {validateToken} from '@/api'
import useTitle from '@/helpers/hooks/useTitle'

import {PageHeader} from '@/components/Structure'
import MainContent from '@/components/MainContent'
import {LoaderContext} from '@/components/Structure/Loader'

export const ImportContext = React.createContext({})

const Import = () => {
  const [importState, setImportState] = useReducer(
    (state, updates) => ({...state, ...updates}),
    {
      containerName: null,
      current: 0,
      errors: null,
      filename: null,
      headers: [],
      loading: false,
      mappedHeaders: [],
      type: 1,
    },
  )

  useTitle('Import Data')

  useEffect(() => {
    validateToken()
  }, [])

  let Component

  switch (importState.current) {
    case 1:
      Component = UploadFile
      break

    case 2:
      Component = MapImportColumns
      break

    case 3:
      Component = Importing
      break

    case 0:
    default:
      Component = SelectImportType
      break
  }

  return (
    <MainContent>
      <PageHeader
        routes={[
          {path: 'camp', breadcrumbName: 'Camp Management'},
          {path: 'camp.import', breadcrumbName: 'Import Data'},
        ]}
        title="Import Data"
      />

      <Row gutter={16}>
        <Col span={8}>
          <Steps
            current={importState.current}
            direction="vertical"
            onChange={c => setImportState({current: c})}
          >
            <Steps.Step
              description="Select import type."
              disabled={importState.current === 0}
              title="Step 1"
            />
            <Steps.Step
              description="Upload your import file."
              disabled={importState.current <= 1}
              title="Step 2"
            />
            <Steps.Step
              description="Map your columns."
              disabled={importState.current <= 2}
              title="Step 3"
            />
            <Steps.Step
              description="Import your data."
              title="Step 4"
              disabled
            />
          </Steps>
        </Col>

        <Col span={16}>
          <Card>
            <ImportContext.Provider value={{importState, setImportState}}>
              <LoaderContext.Provider
                value={{
                  spinning: importState.loading,
                  tip: 'Importing data...',
                }}
              >
                <Component />
              </LoaderContext.Provider>
            </ImportContext.Provider>
          </Card>
        </Col>
      </Row>
    </MainContent>
  )
}

export default Import
