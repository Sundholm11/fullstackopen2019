import React from 'react'
import { connect } from 'react-redux'

import { notificationChange } from '../reducers/notificationReducer'
import { logOut } from '../reducers/userReducer'

const LoggedIn = (props) => {

	const handleLogOut = () => {
		props.logOut()
		props.setNotification('User logged out', 1, 5)
	}

	return (
		<div className="item">{props.user.name} logged in
			<button className="ui button" onClick={handleLogOut}>Logout</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification: notificationChange,
	logOut: logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn)