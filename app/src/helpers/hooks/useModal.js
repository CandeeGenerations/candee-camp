import React, {useState} from 'react'
import {Modal} from 'antd'

export default ({
  callback,
  content,
  keepLoading = false,
  okButtonDisabled = false,
  onCancel = null,
  onOk = null,
  title,
  ...rest
}) => {
  const [params, setParams] = useState(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const show = () => setVisible(true)

  const hide = () => setVisible(false)

  const submit = async () => {
    if (!onOk || typeof onOk !== 'function') {
      hide()
      return
    }

    setLoading(true)

    const result = await (params ? onOk(...params) : onOk())

    if (!keepLoading) {
      setLoading(false)
    }

    if (result) {
      if (!keepLoading) {
        hide()
      }

      if (callback && typeof callback === 'function') {
        callback(result.data)
      }
    }
  }

  const close = async () => {
    if (!onCancel || typeof onCancel !== 'function') {
      hide()
      return
    }

    await onCancel()
    hide()
  }

  const render = visible && (
    <Modal
      okButtonProps={{disabled: okButtonDisabled, loading}}
      okText="Submit"
      title={title}
      visible={visible}
      onCancel={close}
      onOk={submit}
      {...rest}
    >
      {content}
    </Modal>
  )

  return {
    hide,
    render,
    setParams: (...p) => setParams(p),
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
    show,
  }
}
