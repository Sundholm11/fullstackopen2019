import React from 'react'

const User = ({ user }) => {

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>Added Blogs</h3>
			<div role="list" className="ui animated list">
				{user.blogs.map(blog => (
					<div role="listitem" className="item" key={blog.id}>{blog.title}</div>
				))}
			</div>
		</div>
	)
}

export default User