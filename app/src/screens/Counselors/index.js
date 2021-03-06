import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {counselorActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CounselorView from './components/CounselorView'
import CounselorsTable from './components/CounselorsTable'
import CounselorFilters from './components/CounselorFilters'

const Counselors = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    counselorFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Counselors')

  const loadCounselors = () => {
    try {
      objectsContext.counselors.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadCounselors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCounselorClick = async (counselorId) => {
    const response = await actions.deleteCounselor(counselorId)

    if (response) {
      loadCounselors()
    }
  }

  const counselors = objectsContext.counselors.results

  return (
    <React.Fragment>
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
            actions={
              counselors && counselors.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.counselorAddPage)
                      }
                    >
                      Add Counselor
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'camp', breadcrumbName: 'Camp Management'},
              {path: 'camp.counselors', breadcrumbName: 'Counselors'},
            ]}
            title="Counselors"
          />

          <CounselorFilters onApplyFilters={loadCounselors} />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.counselors.loading,
              tip: 'Loading counselors...',
            }}
          >
            <ErrorWrapper
              handleRetry={loadCounselors}
              hasError={errorWrapper.hasError}
            >
              <CounselorsTable
                counselors={
                  (counselors &&
                    counselors.map((counselor) => ({
                      ...counselor,
                      key: counselor.id,
                    }))) ||
                  []
                }
                deleteCounselor={handleDeleteCounselorClick}
                onCreateCounselor={() =>
                  routerContext.router.navigate(page.counselorAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>

      {page.isCounselorAddOrEditPage && (
        <CounselorView
          id={
            (routerContext.route.params &&
              routerContext.route.params.counselorId) ||
            null
          }
          onDeleteCounselor={handleDeleteCounselorClick}
        />
      )}
    </React.Fragment>
  )
}

export default Counselors
