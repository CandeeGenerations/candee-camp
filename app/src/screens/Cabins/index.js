import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import {cabinActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, FiltersContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

import CabinsTable from './components/CabinsTable'
import CabinFilters from './components/CabinFilters'

const Cabins = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const {
    cabinFilters: {transformedFilters},
  } = useContext(FiltersContext)

  useTitle('Cabins')

  const loadCabins = async () => {
    try {
      objectsContext.cabins.load(transformedFilters)
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    loadCabins()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCabinClick = async (cabinId) => {
    const response = await actions.deleteCabin(cabinId)

    if (response) {
      loadCabins()
    }
  }

  const cabins = objectsContext.cabins.results

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
              cabins && cabins.length > 0
                ? [
                    <Button
                      key="add"
                      type="primary"
                      onClick={() =>
                        routerContext.router.navigate(page.cabinAddPage)
                      }
                    >
                      Add Cabin
                    </Button>,
                  ]
                : []
            }
            routes={[
              {path: 'camp', breadcrumbName: 'Camp Management'},
              {path: 'camp.cabins', breadcrumbName: 'Cabins'},
            ]}
            title="Cabins"
          />

          <CabinFilters onApplyFilters={loadCabins} />

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.cabins.loading,
              tip: 'Loading cabins...',
            }}
          >
            <ErrorWrapper
              handleRetry={() => objectsContext.cabins.load(transformedFilters)}
              hasError={errorWrapper.hasError}
            >
              <CabinsTable
                cabins={
                  (cabins &&
                    cabins.map((cabin) => ({
                      ...cabin,
                      key: cabin.id,
                    }))) ||
                  []
                }
                deleteCabin={handleDeleteCabinClick}
                onCreateCabin={() =>
                  routerContext.router.navigate(page.cabinAddPage)
                }
              />
            </ErrorWrapper>
          </LoaderContext.Provider>
        </Card>
      </MainContent>
    </React.Fragment>
  )
}

export default Cabins
