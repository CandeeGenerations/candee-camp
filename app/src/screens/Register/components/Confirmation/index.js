import React, {useContext} from 'react'
import {Typography, Divider} from 'antd'

import {RegisterContext} from '../..'
import EventMetaData from '../EventInformation/components/EventMetaData'

const Confirmation = () => {
  const registerContext = useContext(RegisterContext)

  return (
    <React.Fragment>
      <Typography.Title>You are good to go!</Typography.Title>

      <p>You have successfully registered for the event below!</p>

      <Divider />

      <EventMetaData event={{results: registerContext.event}} />
    </React.Fragment>
  )
}

export default Confirmation
