/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import {Divider, Table} from 'antd'
import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider, DropTarget, DragSource} from 'react-dnd'

import {formatIsActive} from '@/helpers'
import usePage from '@/helpers/hooks/usePage'
import {Constants} from '@/helpers/constants'

import {NavItem} from '@/components/Navigation'
import EmptyState from '@/components/EmptyState'
import loader from '@/components/Structure/Loader'
import DeleteLink from '@/components/Structure/DeleteLink'

const {Column} = Table

let draggingIndex = -1

const BodyRow = (props) => {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow, // eslint-disable-line no-unused-vars
    ...restProps
  } = props
  const style = {...restProps.style, cursor: 'move'}

  let {className} = restProps

  if (isOver) {
    if (restProps.index > draggingIndex) {
      className += ' drop-over-downward'
    }
    if (restProps.index < draggingIndex) {
      className += ' drop-over-upward'
    }
  }

  return connectDragSource(
    connectDropTarget(
      <tr {...restProps} className={className} style={style} />,
    ),
  )
}

const CustomFieldsTable = (props) => {
  const page = usePage()

  const rowSource = {
    beginDrag(p) {
      draggingIndex = p.index
      return {
        index: p.index,
      }
    },
  }

  const rowTarget = {
    drop(p, monitor) {
      const dragIndex = monitor.getItem().index
      const hoverIndex = p.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Time to actually perform the action
      p.moveRow(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    },
  }

  const handleMoveRow = (dragIndex, hoverIndex) => {
    const source = props.customFields[dragIndex]
    const target = props.customFields[hoverIndex]

    props.onReorderCustomFields(source.id, target.id)
  }

  const DraggableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }))(
    DragSource('row', rowSource, (connect) => ({
      connectDragSource: connect.dragSource(),
    }))(BodyRow),
  )

  return props.loader.spinning ? (
    <div css={{minHeight: 500}} />
  ) : props.customFields.length === 0 ? (
    <EmptyState title="Custom Fields" onCreateNew={props.onCreateCustomField} />
  ) : (
    <DndProvider backend={HTML5Backend}>
      <Table
        components={{
          body: {
            row: DraggableBodyRow,
          },
        }}
        dataSource={props.customFields}
        pagination={Constants.TableOptions.PaginationOptions}
        onRow={(record, index) => ({
          index,
          moveRow: handleMoveRow,
        })}
      >
        <Column
          key="order"
          align="right"
          render={(_, __, index) => `${index + 1}.`}
          title="Order"
        />

        <Column key="name" dataIndex="name" title="Name" />

        <Column key="fieldType" dataIndex="fieldType" title="Field Type" />

        <Column
          key="required"
          align="center"
          dataIndex="required"
          render={formatIsActive}
          title="Required Field"
        />

        <Column
          key="isActive"
          align="center"
          dataIndex="isActive"
          render={formatIsActive}
          title="Is Active"
        />

        <Column
          key="action"
          align="right"
          render={(text, record) => (
            <span>
              <NavItem
                params={{customFieldId: record.id}}
                routeName={page.customFieldEditPage}
              >
                Edit
              </NavItem>

              <Divider type="vertical" />

              <DeleteLink
                title={
                  <p>
                    Are you sure you want
                    <br />
                    to delete this custom field?
                  </p>
                }
                onConfirm={() => props.deleteCustomField(record.id)}
              />
            </span>
          )}
          title="Actions"
        />
      </Table>
    </DndProvider>
  )
}

CustomFieldsTable.propTypes = {
  customFields: PropTypes.arrayOf(
    PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      fieldType: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loader: PropTypes.shape({
    spinning: PropTypes.bool.isRequired,
  }).isRequired,

  // function
  deleteCustomField: PropTypes.func.isRequired,
  onCreateCustomField: PropTypes.func.isRequired,
  onReorderCustomFields: PropTypes.func.isRequired,
}

export default loader(CustomFieldsTable)
