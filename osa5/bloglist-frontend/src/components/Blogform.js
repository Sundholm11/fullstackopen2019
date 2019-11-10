import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blogform = ( { handleCreate } ) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	Blogform.propTypes = {
		handleCreate: PropTypes.func.isRequired
	}

	const handle = event => {
		event.preventDefault()
		handleCreate({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={handle}>
				<div>
                    Title
					<input
						type="text"
						value={title}
						name="Title"
						onChange={ ({ target }) => setTitle(target.value) }
					/>
				</div>
				<div>
                    Author
					<input
						type="text"
						value={author}
						name="Author"
						onChange={ ({ target }) => setAuthor(target.value) }
					/>
				</div>
				<div>
                    URL
					<input
						type="text"
						value={url}
						name="URL"
						onChange={ ({ target }) => setUrl(target.value) }
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	)
}

export default Blogform