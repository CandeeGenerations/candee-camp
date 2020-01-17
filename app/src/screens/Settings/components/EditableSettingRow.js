import React from 'react'
import {Form} from 'antd'

export const EditableSettingsContext = React.createContext()

const EditableSettingRow = ({form, ...props}) => (
  <EditableSettingsContext.Provider value={form}>
    <tr {...props} />
  </EditableSettingsContext.Provider>
)

export default Form.create()(EditableSettingRow)
