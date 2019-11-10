import React from 'react'

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}
	if (message.type === 1) {
		return (
			<div className='blogSuccess'>
				{message.name}
			</div>
		)
	}
	else if (message.type === 0) {
		return (
			<div className="blogError">
				{message.name}
			</div>
		)
	}
}

export default Notification