import React from 'react'

import './signinLayout.scss'

type Props = {
  children: React.ReactNode,
  title: string,
}

export default (props: Props) => {
  return (
    <div className="cc--signin-layout">
      <div className="cc--content">{props.children}</div>

      <div className="cc--title-wrapper">
        <div className="cc--title">{props.title}</div>
      </div>
    </div>
  )
}
