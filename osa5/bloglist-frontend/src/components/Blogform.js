import React from 'react'
import PropTypes from 'prop-types'
import  { useField } from '../hooks'

const Blogform = ( { handleCreate } ) => {
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	Blogform.propTypes = {
		handleCreate: PropTypes.func.isRequired
	}

	const handle = event => {
		event.preventDefault()
		handleCreate({ title, author, url })
		title.reset()
		author.reset()
		url.reset()
	}

	return (
		<div>
			<form onSubmit={handle}>
				<div>
                    Title
					<input {...title.inputProps()} />
				</div>
				<div>
                    Author
					<input {...author.inputProps()} />
				</div>
				<div>
                    URL
					<input {...url.inputProps()} />
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	)
}

export default Blogform