/** @jsx jsx */
import {jsx} from '@emotion/core'
import PropTypes from 'prop-types'

const SigninLayout = (props) => {
  return (
    <div
      css={{
        paddingTop: 200,
        minHeight: '100%',
        paddingBottom: 50,
        textAlign: 'center',
        position: 'relative',
        backgroundSize: 'cover',
        background: "url('/img/signin-background-1.jpg') top right no-repeat",

        '@media screen and (max-width: 860px)': {
          paddingTop: 50,
        },

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
          top: 0,
          zIndex: 1,
          width: 700,
          height: 611,
          padding: 60,
          borderRadius: 8,
          textAlign: 'left',
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'middle',
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
          backgroundColor: '#E9F1EF',

          '@media screen and (max-width: 1095px)': {
            display: 'none',
          },
        }}
      >
        <div
          css={{
            top: '50%',
            left: -150,
            width: 800,
            fontSize: 80,
            marginTop: -60,
            fontWeight: 700,
            color: '#a1cec9',
            position: 'absolute',
            textTransform: 'uppercase',
            transform: 'rotate(-90deg)',
            fontFamily: "'Comfortaa', sans-serif",

            '@media screen and (max-width: 1305px)': {
              left: -250,
            },
          }}
        >
          {props.title}
        </div>
      </div>
    </div>
  )
}

SigninLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default SigninLayout
