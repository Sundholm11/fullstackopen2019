import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ( { blog, user, likesHandler, removeHandler } ) => {
	const [info, setInfo] = useState(false)
	const [visible, setVisible] = useState(false)

	Blog.propTypes = {
		blog: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		likesHandler: PropTypes.func.isRequired,
		removeHandler: PropTypes.func.isRequired
	}

	const showForUser = { display: visible ? '' : 'none' }

	const showLittleDetail = { display: info ? 'none' : '' }
	const showMoreDetail = { display: info ? '' : 'none' }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleDetail = () => {
		setInfo(!info)
		user.name === blog.user[0].name && user.username === blog.user[0].username ? setVisible(true) : setVisible(false)
	}

	return (
		<div style={blogStyle} className="blog">
			<div onClick={toggleDetail} style={showLittleDetail}>
                '{blog.title}' authored by {blog.author}
			</div>
			<div onClick={toggleDetail} style={showMoreDetail} className="moreDetail">
				<p>'{blog.title}' authored by {blog.author}</p>
				<a href="http://localhost:3000/">{blog.url}</a>
				<div>
					{blog.likes} likes
					<button onClick={likesHandler}>Like</button>
				</div>
				<p>Added by {blog.user[0].name}</p>
				<div style={showForUser}>
					<button onClick={removeHandler}>Remove</button>
				</div>
			</div>
		</div>
	)
}

export default Blog