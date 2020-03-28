/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'
import Version from '@/components/Version'

const SigninLayout = (props) => {
  return (
    <>
      <div
        css={{
          paddingTop: 50,
          minHeight: '100%',
          paddingBottom: 50,
          textAlign: 'center',
          position: 'relative',
          backgroundSize: 'cover !important',
          background: "url('/img/signin-background-1.jpg') top right no-repeat",

          '&:before': {
            width: 0,
            content: '""',
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'middle',
          },
        }}
      >
        <div
          css={{
            zIndex: 1,
            width: 700,
            padding: 60,
            borderRadius: 8,
            textAlign: 'left',
            position: 'relative',
            display: 'inline-block',
            backgroundColor: '#fff',
            boxShadow: '0 0 96px 10px rgba(0, 0, 0, 0.15)',

            '@media screen and (max-width: 860px)': {
              width: '100%',
              borderRadius: 0,
              minWidth: 'auto',
            },
          }}
        >
          {props.children}
        </div>

        <div
          css={{
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 0,
            width: '40%',
            position: 'absolute',
            backgroundColor: '#f0f5f9',

            '@media screen and (max-width: 1095px)': {
              display: 'none',
            },
          }}
        />
      </div>

      <div css={{position: 'relative'}}>
        <Version hideVersion light />
      </div>
    </>
  )
}

SigninLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SigninLayout
