import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	Togglable.displayName = 'Togglable'
	Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button className="ui button" onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button className="ui secondary button" onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	)
})

export default Togglable