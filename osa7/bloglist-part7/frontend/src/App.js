import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

import userService from './services/users'

const App = (props) => {
	useEffect(() => {
		props.initBlogs()
		props.initUser()
	}, [])

	const [ users, setUsers ] = useState([])

	useEffect(() => {
		userService
			.getAll()
			.then(returnedUsers => {
				setUsers(returnedUsers)
			})
	}, [])

	const userById = (id, users) => users.find(user => user.id === id)

	const blogById = (id, blogs) => blogs.find(blog => blog.id === id)


	const blogFormRef = React.createRef()

	const NewBlog = withRouter(Blog)
	const NewBlogForm = withRouter(BlogForm)

	if (users.length === 0) {
		return null
	}

	return (
		<div className="ui container" >
			<h1 className="ui center aligned header" >Blogs</h1>
			<Notification />
			{props.user === null ?
				<div>
					<LoginForm />
				</div> :
				<div>
					<Router>
						<Menu />
						<Route exact path="/create" render={() =>
							<div>
								<h2 className="ui header">Create New Blog
									<div className="sub header">For adding a new blog to the list</div>
								</h2>
								<Togglable buttonLabel="Open blog form" ref={blogFormRef}>
									<NewBlogForm blogFormRef={blogFormRef} />
								</Togglable>
							</div>} />
						<Route exact path="/" render={() => <BlogList />} />
						<Route exact path="/blogs/:id" render={({ match }) =>
							<NewBlog blog={blogById(match.params.id, props.blogs)}/> }/>
						<Route exact path="/users" render={() => <UserList users={users} />} />
						<Route exact path="/users/:id" render={({ match }) =>
							<User user={userById(match.params.id, users)}/> }/>
					</Router>
				</div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user
	}
}

const mapDispatchToProps = {
	initBlogs: initializeBlogs,
	initUser: initializeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)