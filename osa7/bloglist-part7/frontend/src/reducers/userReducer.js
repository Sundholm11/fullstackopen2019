import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = [], action) => {
	switch(action.type) {
	case 'LOG_IN':
		window.localStorage.setItem(
			'loggedBlogappUser', JSON.stringify(action.data))
		blogService.setToken(action.data.token)
		return action.data
	case 'LOG_OUT':
		window.localStorage.removeItem('loggedBlogappUser')
		return null
	case 'INIT_USER': {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			return user
		}
		return null
	}
	default:
		return state
	}
}

export const logIn = (username, password) => {
	return async dispatch => {
		const user = await loginService.login({ username, password })
		dispatch({
			type: 'LOG_IN',
			data: user
		})
	}
}

export const logOut = () => {
	return {
		type: 'LOG_OUT'
	}
}

export const initializeUser = () => {
	return {
		type: 'INIT_USER'
	}
}

export default userReducer