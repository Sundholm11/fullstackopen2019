import React from 'react'
import { connect } from 'react-redux'

import { useField } from '../hooks/index'

import { logIn } from '../reducers/userReducer'
import { notificationChange } from '../reducers/notificationReducer'

const LoginForm = (props) => {
	const username = useField('text')
	const password = useField('password')

	const handleLogin = async (event) => {
		event.preventDefault()
		props.logIn(username.value, password.value)
		props.setNotification(
			`Logged in as ${username.value}`, 1, 5)
		username.reset()
		password.reset()
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					Username
					<input {...username.inputProps()} id="username"/>
				</div>
				<div>
					Password
					<input {...password.inputProps()} id="password"/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	logIn: logIn,
	setNotification: notificationChange
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)