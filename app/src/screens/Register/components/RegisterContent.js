/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Steps} from 'antd'
import React, {useState} from 'react'

import loader from '@/components/Structure/Loader'

import Payment from './Payment'
import Confirmation from './Confirmation'
import EventInformation from './EventInformation'

const RegisterContent = () => {
  const [step, setStep] = useState(0)

  let Component

  switch (step) {
    case 1:
      Component = Payment
      break

    case 2:
      Component = Confirmation
      break

    case 0:
    default:
      Component = EventInformation
      break
  }

  return (
    <React.Fragment>
      <Steps css={{marginBottom: 50}} current={step}>
        <Steps.Step title="Event &amp; Campers" />
        <Steps.Step title="Payment" />
        <Steps.Step title="Confirmation" />
      </Steps>

      <Component
        onNext={() => setStep(step + 1)}
        onPrevious={() => setStep(step - 1)}
      />
    </React.Fragment>
  )
}

export default loader(RegisterContent)
