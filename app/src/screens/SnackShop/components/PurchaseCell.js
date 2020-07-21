/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {InputNumber, Input, Form, Select} from 'antd'

import {inputNumberFormatter, inputNumberParser} from '@/helpers'

import {EditablePurchasesContext} from './PurchasesTable'

const PurchaseCell = (props) => {
  const getInput = (
    id,
    inputType,
    snackShopItems = [],
    itemSelected = null,
  ) => {
    if (inputType === 'currency') {
      return (
        <InputNumber
          formatter={inputNumberFormatter}
          min={0}
          parser={inputNumberParser}
        />
      )
    }

    if (inputType === 'snackShopItem') {
      return (
        <Select
          css={{width: '100%'}}
          optionFilterProp="children"
          filterOption
          showSearch
          onChange={(val) => itemSelected(id, val)}
        >
          {snackShopItems.map((x) => (
            <Select.Option key={x.id} value={x.id}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      )
    }

    return <Input />
  }

  return (
    <EditablePurchasesContext.Consumer>
      {({getFieldDecorator}) => {
        const {
          editing,
          dataIndex,
          title,
          record,
          children,
          snackShopItems,
          inputType,
          itemSelected,
          ...restProps
        } = props

        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item style={{margin: 0}}>
                {getFieldDecorator(dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: `Please Input ${title}!`,
                    },
                  ],
                  initialValue: record[dataIndex],
                })(
                  getInput(record.key, inputType, snackShopItems, itemSelected),
                )}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        )
      }}
    </EditablePurchasesContext.Consumer>
  )
}

PurchaseCell.propTypes = {
  children: PropTypes.node,
  dataIndex: PropTypes.string,
  editing: PropTypes.bool,
  record: PropTypes.object,
  title: PropTypes.string,
}

export default PurchaseCell
