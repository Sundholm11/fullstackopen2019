import React from 'react'

const Notification = ( {message} ) => {
    if (message === null) {
        return null
    }
    if (message.type === 1) {
        return (
        <div className='noteSuccess'>
            {message.name}
        </div>
        )
    }
    else if (message.type === 0) {
        return (
        <div className='noteError'>
            {message.name}
        </div>
        )
    }
}

export default Notification