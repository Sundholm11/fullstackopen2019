import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { resetNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
	useEffect(() => {
		setTimeout(() => {props.resetNotification()}, props.timeout * 1000)}, [props])

	switch(props.type) {
	case 0:
		return <div className='blogError'>{props.notification}</div>
	case 1:
		return <div className='blogSuccess'>{props.notification}</div>
	default:
		return null
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification.content,
		type: state.notification.type,
		timeout: state.notification.timeout
	}
}

export default connect(mapStateToProps, { resetNotification })(Notification)