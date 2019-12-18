import React from 'react'
import {Button, Result} from 'antd'
import {useRouter} from 'react-router5'

import useTitle from '@/helpers/hooks/useTitle'
import MainContent from '@/components/MainContent'

const NotFound = () => {
  useTitle('Not Found')

  const router = useRouter()

  return (
    <MainContent>
      <Result
        extra={
          <Button type="primary" onClick={() => router.navigate('dashboard')}>
            Back Home
          </Button>
        }
        status="404"
        subTitle="The page you are looking for doesn't exist."
        title="Not Found"
      />
    </MainContent>
  )
}

export default NotFound
