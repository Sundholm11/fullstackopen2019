const notificationReducer = (state = [{content:"", timeout:0}], action) => {
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
            content: '',
            timeout: 0
        }
    }
}

export const notificationChange = (notification, time) => {
    return {  
        type: 'SET_NOTIFICATION',
        data: { 
            content: notification,
            timeout: time
        }
    }
}

export default notificationReducer