/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Card, Icon} from 'antd'
import PropTypes from 'prop-types'

const CamperCard = (props) => {
  return props.new ? (
    <Card
      className="camper"
      css={{
        borderRadius: 5,
        marginBottom: 10,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#fbfbfb',
        },
      }}
      size="small"
      onClick={() => props.onClick()}
    >
      <Icon type="plus" /> Add a Camper
    </Card>
  ) : (
    <Card
      className="camper"
      css={{
        borderRadius: 5,
        marginBottom: 10,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#fbfbfb',
        },
      }}
      size="small"
      onClick={() => props.onClick(props.data)}
    >
      {props.data.firstName.value} {props.data.lastName.value}
    </Card>
  )
}

CamperCard.defaultProps = {
  new: false,
}

CamperCard.propTypes = {
  data: PropTypes.shape({}),
  new: PropTypes.bool,

  // functions
  onClick: PropTypes.func.isRequired,
}

export default CamperCard
