import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRoute} from 'react-router5'

import GroupViewWrapper from './GroupViewWrapper'

import usePage from '@/helpers/hooks/usePage'
import {groupActions as actions} from '@/actions'
import useAsyncLoad from '@/helpers/hooks/useAsyncLoad'
import {isFormReady, mergeFormData, anyTouchedFields} from '@/helpers'

import DrawerView from '@/components/Structure/DrawerView'
import {LoaderContext} from '@/components/Structure/Loader'
import {ObjectsContext, ValuesContext} from '@/screens/App'
import ErrorWrapper, {useError} from '@/components/ErrorBoundary/ErrorWrapper'

const GroupView = props => {
  const page = usePage()
  const errorWrapper = useError()
  const routerContext = useRoute()
  const objectsContext = useContext(ObjectsContext)
  const valuesContext = useContext(ValuesContext)
  const group = useAsyncLoad(actions.loadGroup, props.id)

  const [fields, setFields] = useState({
    name: {includePercent: true, isRequired: true, value: null},
    campers: {value: []},
    isActive: {value: true},
    loginUser: {includePercent: true, isRequired: true, value: null},
  })

  const getGroup = async () => {
    try {
      const response = await group.load()

      if (response) {
        setFields(stateFields =>
          mergeFormData(stateFields, {
            ...response.data,
            campers: response.data.campers.map(x => `${x}`),
            loginUser: `${response.data.loginUser}`,
          }),
        )
      }
    } catch {
      errorWrapper.handleCatchError()
    }
  }

  useEffect(() => {
    objectsContext.campers.load()
    objectsContext.users.load()

    if (valuesContext.groupValues && valuesContext.groupValues.valid) {
      group.stopLoading()

      setFields(valuesContext.groupValues.fields)
      valuesContext.setGroupValues(undefined)
    } else if (props.id) {
      getGroup()
    } else {
      group.stopLoading()
    }
  }, [props.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = changedFields =>
    setFields(stateFields => ({...stateFields, ...changedFields}))

  const refreshTable = () => objectsContext.groups.load()

  const handleFormSubmit = async () => {
    if (isFormReady(fields)) {
      group.startLoading()

      const response = await actions.saveGroup(fields)

      group.stopLoading()

      if (response) {
        refreshTable()

        routerContext.router.navigate(page.groupEditPage, {
          groupId: response.data.id,
        })
      }
    }
  }

  const handleDeleteGroupClick = async () => {
    group.startLoading()

    const response = await actions.deleteGroup(props.id)

    group.stopLoading()

    if (response) {
      refreshTable()
      routerContext.router.navigate(page.groupsPage)
    }
  }

  const handleCreateNewAccount = adding => {
    valuesContext.setGroupValues({
      fields,
      valid: false,
      adding,
    })

    routerContext.router.navigate(page.groupUserAddPage)
  }

  const submitButtonDisabled =
    group.loading ||
    objectsContext.campers.loading ||
    (!fields.id && !isFormReady(fields)) ||
    (fields.id && !anyTouchedFields(fields)) ||
    (anyTouchedFields(fields) && !isFormReady(fields))

  return (
    <>
      <DrawerView
        fields={fields}
        parentRoute={page.groupsPage}
        submitButtonDisabled={submitButtonDisabled}
        title={
          fields.id
            ? `Edit Group - ${group.results ? group.results.name : ''}`
            : 'Add a New Group'
        }
        width={512}
        onSubmit={handleFormSubmit}
      >
        <LoaderContext.Provider
          value={{
            spinning: group.loading || objectsContext.campers.loading,
            tip: 'Loading group...',
          }}
        >
          <ErrorWrapper handleRetry={getGroup} hasError={errorWrapper.hasError}>
            <GroupViewWrapper
              campersList={objectsContext.campers.results || []}
              fields={fields}
              usersList={objectsContext.users.results || []}
              onCreateNewAccount={handleCreateNewAccount}
              onDeleteGroup={handleDeleteGroupClick}
              onFieldChange={handleFieldChange}
            />
          </ErrorWrapper>
        </LoaderContext.Provider>
      </DrawerView>
    </>
  )
}

GroupView.defaultProps = {
  id: null,
}

GroupView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default GroupView
