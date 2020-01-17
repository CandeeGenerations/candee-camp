import React, {useContext, useEffect} from 'react'
import {Button, Card} from 'antd'
import {useRoute} from 'react-router5'
import {css, Global} from '@emotion/core'

import CabinsTable from './components/CabinsTable'

import {cabinActions as actions} from '@/actions'

import usePage from '@/helpers/hooks/usePage'
import useTitle from '@/helpers/hooks/useTitle'

import {ObjectsContext} from '@/screens/App'
import MainContent from '@/components/MainContent'
import PageHeader from '@/components/Structure/PageHeader'
import {LoaderContext} from '@/components/Structure/Loader'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const Cabins = () => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)

  useTitle('Cabins')

  useEffect(() => {
    try {
      objectsContext.cabins.load()
    } catch (error) {
      errorWrapper.handleCatchError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCabinClick = async cabinId => {
    const response = await actions.deleteCabin(cabinId)

    if (response) {
      objectsContext.cabins.load()
    }
  }

  const cabins = objectsContext.cabins.results

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

          <LoaderContext.Provider
            value={{
              spinning: objectsContext.cabins.loading,
              tip: 'Loading cabins...',
            }}
          >
            <ErrorWrapper
              handleRetry={objectsContext.cabins.load}
              hasError={errorWrapper.hasError}
            >
              <CabinsTable
                cabins={
                  (cabins &&
                    cabins.map(cabin => ({
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
    </>
  )
}

export default Cabins
