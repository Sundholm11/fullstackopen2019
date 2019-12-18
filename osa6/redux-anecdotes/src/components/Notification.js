import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  useEffect(() => {
    setTimeout(() => {props.resetNotification()}, props.timeout * 1000)}, [props])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification ? state.notification.content : "",
    timeout: state.notification ? state.notification.timeout : 0
  }
}

export default connect(
  mapStateToProps, { resetNotification }
)(Notification)