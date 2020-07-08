/** @jsx jsx */
import {jsx} from '@emotion/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import {useRouter} from 'react-router5'
import {Form, Table, Icon, Divider} from 'antd'
import React, {useEffect, useContext, useState} from 'react'

import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'
import {formatCurrency, formatDate} from '@/helpers'
import {snackShopPurchaseActions as actions} from '@/actions'

import {ObjectsContext} from '@/screens/App'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

import PurchaseCell from './PurchaseCell'

export const EditablePurchasesContext = React.createContext()

const PurchasesTable = (props) => {
  const page = usePage()
  const routerContext = useRouter()
  const objectsContext = useContext(ObjectsContext)

  const [loading, setLoading] = useState(false)
  const [editingKey, setEditingKey] = useState(0)
  const [newSnackShopPurchase, setNewSnackShopPurchase] = useState({
    key: 0,
    id: 0,
    snackShopItemId: 0,
    purchasedPrice: 0,
    purchasedDate: moment(),
  })

  useEffect(() => {
    if (
      objectsContext.snackShopItems.results &&
      objectsContext.snackShopItems.results.length > 0
    ) {
      const snackShopItemId = objectsContext.snackShopItems.results[0].id
      const item = objectsContext.snackShopItems.results.find(
        (x) => x.id === snackShopItemId,
      )

      setNewSnackShopPurchase((state) => ({
        ...state,
        purchasedPrice: item.price,
        snackShopItemId,
      }))
    }
  }, [objectsContext.snackShopItems.results])

  const isNewPurchase = (record) => record.key === 0

  const isEditing = (record) => record.key === editingKey

  const cancel = () => setEditingKey(0)

  const edit = (key) => setEditingKey(key)

  const save = (form, id) => {
    form.validateFields(async (error, row) => {
      if (error) {
        return
      }

      setLoading(true)

      const response = await actions.saveSnackShopPurchase({
        camperId: props.camperId,
        counselorId: props.counselorId,
        source: props.camperId ? 'camper' : 'counselor',
        snackShopPurchase: {...row, id},
      })

      setLoading(false)

      if (response) {
        setEditingKey(0)
        props.refreshTable()
      }
    })
  }

  const deletePurchase = async (snackShopPurchaseId) => {
    const response = await actions.deleteSnackShopPurchase({
      camperId: props.camperId,
      counselorId: props.counselorId,
      source: props.camperId ? 'camper' : 'counselor',
      snackShopPurchaseId,
    })

    if (response) {
      props.refreshTable()
    }
  }

  const columns = [
    {
      title: 'Snack Shop Item',
      dataIndex: 'snackShopItemId',
      editable: true,
      render: (text, record) => {
        const item = props.items.find((x) => x.id === record.snackShopItemId)

        return item ? item.name : ''
      },
    },
    {
      align: 'right',
      title: 'Purchased Price',
      dataIndex: 'purchasedPrice',
      editable: true,
      render: formatCurrency,
    },
    {
      align: 'right',
      title: 'Purchased Date',
      dataIndex: 'purchasedDate',
      render: formatDate,
    },
    {
      align: 'right',
      title: '',
      dataIndex: 'operation',
      render: (text, record) =>
        isEditing(record) ? (
          <React.Fragment>
            <EditablePurchasesContext.Consumer>
              {(form) =>
                loading ? (
                  <Icon css={{marginRight: 5}} type="loading" />
                ) : (
                  <a onClick={() => save(form, record.key)}>
                    {isNewPurchase(record) ? 'Purchase Item' : 'Save'}
                  </a>
                )
              }
            </EditablePurchasesContext.Consumer>

            {!isNewPurchase(record) && (
              <React.Fragment>
                <Divider type="vertical" />

                <a onClick={() => cancel(record.key)}>Cancel</a>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <a disabled={editingKey !== 0} onClick={() => edit(record.key)}>
              Edit
            </a>

            <Divider type="vertical" />

            <DeleteLink
              title={
                <p>
                  Are you sure you want
                  <br />
                  to delete this snack shop purchase?
                </p>
              }
              onConfirm={() => deletePurchase(record.key)}
            />
          </React.Fragment>
        ),
    },
  ]

  const components = {
    body: {
      cell: PurchaseCell,
    },
  }

  const tableColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'purchasedPrice'
            ? 'currency'
            : col.dataIndex === 'snackShopItemId'
            ? 'snackShopItem'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        snackShopItems: props.items,
        itemSelected: (id, val) => {
          if (id === 0) {
            const item = objectsContext.snackShopItems.results.find(
              (x) => x.id === val,
            )

            setNewSnackShopPurchase((state) => ({
              ...state,
              purchasedPrice: item.price,
            }))
          }
        },
      }),
    }
  })

  const purchases = props.purchases.map((x) => ({...x, key: x.id}))
  const dataSource =
    editingKey === 0 ? [...purchases, newSnackShopPurchase] : purchases

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : objectsContext.snackShopItems.results &&
    objectsContext.snackShopItems.results.length === 0 ? (
    <EmptyState
      title="Snack Shop Item"
      onCreateNew={() => routerContext.navigate(page.snackShopItemAddPage)}
    />
  ) : (
    <EditablePurchasesContext.Provider value={props.form}>
      <Table
        columns={tableColumns}
        components={components}
        dataSource={dataSource}
        pagination={{
          ...Constants.TableOptions.PaginationOptions,
          onChange: cancel,
        }}
        rowClassName="editable-row"
      />
    </EditablePurchasesContext.Provider>
  )
}

PurchasesTable.propTypes = {
  counselorId: PropTypes.number,
  camperId: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  purchases: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  // functions
  refreshTable: PropTypes.func.isRequired,
}

const PurchasesTableForm = Form.create()(PurchasesTable)

export default loader(PurchasesTableForm)
