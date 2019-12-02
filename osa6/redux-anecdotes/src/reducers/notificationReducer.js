export const notificationChanged = (store, value) => {
    store.dispatch(notificationChange(value))
    setTimeout(() => {
        store.dispatch(notificationChange(''))
    }, 5000)
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.content
        default:
            return state
    }
}

const notificationChange = content => {
    return {
        type: 'SET_NOTIFICATION',
        content
    }
}

export default notificationReducer