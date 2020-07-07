/** @jsx jsx */
import {css, Global, jsx} from '@emotion/core'
import {Card} from 'antd'
import React, {useEffect} from 'react'

import useTitle from '@/helpers/hooks/useTitle'
import {settingActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'

import {PageHeader} from '@/components/Structure'
import MainContent from '@/components/MainContent'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import SettingsTable from './components/SettingsTable'

const Settings = () => {
  const errorWrapper = useError()
  const settings = useAsyncLoad(actions.loadSettings)

  useTitle('Camp Settings')

  useEffect(() => {
    try {
      settings.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainContent>
      <Global
        styles={css`
          .editable-cell-value-wrap {
            padding: 5px 12px;
            cursor: pointer;
          }

          .editable-row:hover .editable-cell-value-wrap {
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            padding: 4px 11px;
          }
        `}
      />

      <Card>
        <PageHeader
          routes={[
            {path: 'camp', breadcrumbName: 'Camp Management'},
            {path: 'camp.settings', breadcrumbName: 'Camp Settings'},
          ]}
          title="Camp Settings"
        />

        <LoaderContext.Provider
          value={{
            spinning: settings.loading,
            tip: 'Loading settings...',
          }}
        >
          <ErrorWrapper
            handleRetry={settings.load}
            hasError={errorWrapper.hasError}
          >
            <SettingsTable
              refreshTable={settings.load}
              settings={settings.results}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </Card>
    </MainContent>
  )
}

export default Settings
