import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blogform from './components/Blogform'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [message, setMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const sortBlogs = blogs => {
		blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
		setBlogs(blogs)
	}

	useEffect(() => {
		blogService
			.getAll()
			.then(blogs => sortBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setMessage({ name: `Logged in as ${user.name}`, type: 1 })
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			setMessage({ name: 'Wrong credentials', type: 0 })
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleCreate = async (blog) => {
		try {
			blogFormRef.current.toggleVisibility()
			const returnedBlog = await blogService.create(blog)
			setBlogs(blogs.concat(returnedBlog))
			setMessage({ name: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, type: 1 })
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			return false
		}
	}

	const loggedIn = () => (
		<div>
			<p>{user.name} logged in</p>
			<button onClick={logOut}>Logout</button>
		</div>
	)

	const loginForm = () => (
		<div>
			<form onSubmit={handleLogin}>
				<div>
                    Username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={ ({ target }) => setUsername(target.value) }
					/>
				</div>
				<div>
                    Password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={ ({ target }) => setPassword(target.value) }
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)

	const showBlogs = () => blogs.map(blog =>
		<Blog
			key={blog.id}
			blog={blog}
			user={user}
			likesHandler={() => increaseLikes(blog.id)}
			removeHandler={() => removeBlog(blog.id)}
		/>
	)

	const increaseLikes = async (id) => {
		const blog = blogs.find(b => b.id === id)
		const changedBlog = { ...blog, likes: blog.likes + 1 }

		try {
			const returnedBlog = await blogService.update(id, changedBlog)
			const updatedBlogs = blogs.map(blog => blog.id !== id ? blog : returnedBlog)
			sortBlogs(updatedBlogs)
		} catch (exception) {
			setMessage({ name: `Unexpected error while increasing likes`, type: 0 })
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const removeBlog = async (id) => {
		const removeBlog = blogs.find(blog => blog.id === id)
		if(window.confirm(`Do you really wanna remove blog ${removeBlog.title} by ${removeBlog.author}?`)) {
			try {
				await blogService.remove(id)
				setBlogs(blogs.filter(blog => blog.id !== id))
				setMessage({ name: `Removed ${removeBlog.title} by ${removeBlog.author} from Blogs`, type: 1 })
				setTimeout(() => {
					setMessage(null)
				}, 5000)
			} catch (exception) {
				return
			}
		}
	}

	const logOut = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setMessage({ name: 'User will be logged out during next refresh', type: 1 })
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const blogFormRef = React.createRef()

	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={message} />
			{user === null ?
				<div>
					<h2>Login</h2>
					{loginForm()} </div> :
				<div>
					{loggedIn()}
					<Togglable buttonLabel="New blog" ref={blogFormRef}>
						<Blogform handleCreate={handleCreate} />
					</Togglable>
					{showBlogs()}
				</div>
			}

		</div>
	)
}

export default App