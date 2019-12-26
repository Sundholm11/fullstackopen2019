const notificationReducer = (state = [{ content:null, type: null, timeout:0 }], action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		return action.data
	case 'RESET_NOTIFICATION':
		return action.data
	default:
		return state
	}
}

export const resetNotification = () => {
	return {
		type: 'RESET_NOTIFICATION',
		data: {
			content: null,
			type: null,
			timeout: 0
		}
	}
}

export const notificationChange = (notification, notificationType, time) => {
	return {
		type: 'SET_NOTIFICATION',
		data: {
			content: notification,
			type: notificationType,
			timeout: time
		}
	}
}

export default notificationReducer