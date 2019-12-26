import React from 'react'
import { connect } from 'react-redux'

import  { useField } from '../hooks/index'

import { newBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'

const BlogForm = (props) => {
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const addBlog = async (event) => {
		event.preventDefault()
		props.history.push('/')
		props.blogFormRef.current.toggleVisibility()
		props.addBlog({ title, author, url })
		props.setNotification(
			`A new blog ${title.value} by ${author.value} added`, 1, 5)
		title.reset()
		author.reset()
		url.reset()
	}

	return (
		<div>
			<form className="ui form" onSubmit={addBlog}>
				<div className="field">
					Title
					<input {...title.inputProps()} placeholder="Title" id="title" />
				</div>
				<div className="field">
					Author
					<input {...author.inputProps()} placeholder="Author" id="author" />
				</div>
				<div className="field">
					URL
					<input {...url.inputProps()} placeholder="URL" id="url" />
				</div>
				<button className="ui primary button" type="submit" id="submit">Create</button>
			</form>
		</div>
	)
}

const mapDispatchToProps = {
	addBlog: newBlog,
	setNotification: notificationChange
}

export default connect(null, mapDispatchToProps)(BlogForm)