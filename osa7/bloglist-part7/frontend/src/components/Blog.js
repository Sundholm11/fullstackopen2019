import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'

import blogService from '../services/blogs'

import  { useField } from '../hooks/index'

const Blog = (props) => {
	const [visible, setVisible] = useState(false)

	const comment = useField('text')

	const user = props.user
	const blog = props.blog

	useEffect(() => {
		user.name === blog.user.name && user.username === blog.user.username ? setVisible(true) : setVisible(false)
	}, [user.name, user.username, blog.user.name, blog.user.username])

	Blog.propTypes = {
		blog: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired
	}

	const showForUser = { display: visible ? '' : 'none' }

	const addComment = async (event) => {
		event.preventDefault()
		blogService.createComment(blog.id, { comment: comment.value, blogId: blog.id })
		comment.reset()
	}

	const removeBlog = () => {
		if(window.confirm(`Do you really wanna remove blog ${blog.title} by ${blog.author}?`)) {
			props.history.push('/')
			props.remove(blog)
			props.setNotification(`Removed ${blog.title} by ${blog.author} from Blogs`, 1, 5)
		}
		return
	}

	const likeBlog = () => {
		props.like(blog)
		props.setNotification(`Liked blog '${blog.title}'`, 1, 5)
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			Blog url: <a href="http://localhost:3000/">{blog.url}</a>
			<div>
				{blog.likes} likes
				<button className="ui mini button" onClick={() => likeBlog()}>Like</button>
			</div>
			<p>Added by {blog.user.name}</p>
			<div style={showForUser}>
				<button className="ui button" onClick={() => removeBlog()}>Remove blog</button>
			</div>
			<h3>Comments</h3>
			<form className="ui form" onSubmit={addComment}>
				<input {...comment.inputProps()} className="six wide field" placeholder="Comment"/>
				<button className="ui button" type="submit">Add comment</button>
			</form>
			{blog.comments.length === 0 ?
				<p>no comments</p> :
				<div role="list" className="ui list">{blog.comments.map(comment =>
					<div role="listitem" className="item" key={comment.id}>{comment.comment}</div>)}
				</div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	like: likeBlog,
	remove: removeBlog,
	setNotification: notificationChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)