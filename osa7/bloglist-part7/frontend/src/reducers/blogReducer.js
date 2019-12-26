import blogService from '../services/blogs'

const sortBlogs = (state) => {
	return (
		state.sort((blogA, blogB) => blogB.likes - blogA.likes)
	)
}

const blogReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_BLOGS':
		return sortBlogs(action.data)
	case 'NEW_BLOG':
		return sortBlogs([...state, action.data])
	case 'LIKE_BLOG': {
		const id = action.data.id
		return sortBlogs(state.map(blog => blog.id !== id ? blog : action.data))}
	case 'REMOVE_BLOG':
		return sortBlogs(state.filter(blog => blog.id !== action.data.id))
	default:
		return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		})
	}
}

export const newBlog = blog => {
	return async dispatch => {
		const newBlog = await blogService.createNew(blog)
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog
		})
	}
}

export const likeBlog = blog => {
	return async dispatch => {
		const changedBlog = {
			...blog,
			likes: blog.likes + 1
		}
		const updatedBlog = await blogService.update(changedBlog.id, changedBlog)
		dispatch({
			type: 'LIKE_BLOG',
			data: updatedBlog
		})
	}
}

export const removeBlog = blog => {
	return async dispatch => {
		await blogService.remove(blog.id)
		dispatch({
			type: 'REMOVE_BLOG',
			data: blog
		})
	}
}

export default blogReducer