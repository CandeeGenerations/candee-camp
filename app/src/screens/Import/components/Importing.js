/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useRoute} from 'react-router5'
import {useContext, useEffect} from 'react'

import {ImportContext} from '..'

import {openNotification} from '@/helpers'
import usePage from '@/helpers/hooks/usePage'
import {importActions as actions} from '@/actions'

import loader from '@/components/Structure/Loader'

const Importing = (props) => {
  const page = usePage()
  const routerContext = useRoute()
  const {importState, setImportState} = useContext(ImportContext)

  const importData = async () => {
    const response = await actions.importFile(importState)

    if (response.data.errors.length > 0) {
      openNotification(
        'error',
        'Some of your data was not imported successfully. Refer to the errors to fix the import.',
      )

      setImportState({
        current: importState.current - 1,
        errors: response.data.errors,
      })
    } else {
      openNotification('success', 'Your data was imported successfully.')

      let route = ''

      switch (importState.type) {
        case 1:
          route = page.cabinsPage
          break

        case 2:
          route = page.couponsPage
          break

        default:
          throw new Error("The page doesn't exist.")
      }

      routerContext.router.navigate(route)
    }
  }

  useEffect(() => {
    importData()
  }, [])

  return props.loader.spinning && <div css={{minHeight: 250}} />
}

export default loader(Importing)
