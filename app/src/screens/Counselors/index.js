import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import CounselorView from './components/CounselorView'
import CounselorsTable from './components/CounselorsTable'

import {counselorActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Counselors = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Counselors')

  useEffect(() => {
    try {
      objectsContext.counselors.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCounselorClick = async counselorId => {
    const response = await actions.deleteCounselor(counselorId)

    if (response) {
      objectsContext.counselors.load()
    }
  }

  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 1160px;
          }
        `}
      />

      <MainContent>
        <Card>
          <PageHeader
            actions={[
              <Button
                key="add"
                type="primary"
                onClick={() =>
                  routerContext.router.navigate(page.counselorsAddPage)
                }
              >
                Add Counselor
              </Button>,
            ]}
            routes={[
              {path: '/dashboard', breadcrumbName: 'Dashboard'},
              {path: '/counselors', breadcrumbName: 'Counselors'},
            ]}
            title="Counselors"
          />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.counselors.loading,
              tip: 'Loading counselors...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.counselors.load}
              hasError={errorWrapper.hasError}
            >
              <CounselorsTable
                counselors={
                  (objectsContext.counselors.results &&
                    objectsContext.counselors.results.map(counselor => ({
                      ...counselor,
                      key: counselor.id,
                    }))) ||
                  []
                }
                deleteCounselor={handleDeleteCounselorClick}
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isCounselorsAddOrEditPage && (
        <CounselorView
          id={
            (routerContext.route.params &&
              routerContext.route.params.counselorId) ||
            null
          }
          onDeleteCounselor={handleDeleteCounselorClick}
        />
      )}
    </>
  )
}

export default Counselors
