import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
	return (
		<div>
			<h2 className="ui header">Bloglist
				<div className="sub header">All posted blogs listed for you</div>
			</h2>
			<div role="list" className="ui divided relaxed list" >
				{props.blogs.map(blog =>
					<div role="listitem" className="item" key={blog.id} >
						<Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</div>)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

export default connect(mapStateToProps)(BlogList)