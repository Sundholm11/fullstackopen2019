const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { comment: 1, id: 1 })

	response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
	try{
		const blog = await Blog.findById(request.params.id)
		if (blog) {
			response.json(blog.toJSON())
		} else {
			response.status(404).end()
		}
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.post('/', async(request, response, next) => {
	const body = request.body

	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'Token missing or invalid' })
		}

		const user = await User.findById(decodedToken.id)

		const blog = new Blog({
			id: body.id,
			title: body.title.value,
			author: body.author.value,
			url: body.url.value,
			likes: body.likes === undefined ? 0 : body.likes,
			user: user.id
		})

		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog.id)
		await user.save()
		response.json(savedBlog.toJSON())
	}
	catch (exception) {
		next(exception)
	}
})

blogsRouter.post('/:id/comments', async(request, response, next) => {
	try {
		const body = request.body

		const blog = await Blog.findById(body.blogId)

		const comment = new Comment({
			comment: body.comment,
			blog: blog.id
		})

		const savedComment = await comment.save()
		blog.comments = blog.comments.concat(savedComment.id)
		await blog.save()

		response.json(savedComment.toJSON())
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {

	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'Token missing or invalid' })
		}

		const requestUser = await User.findById(decodedToken.id)
		const blogUser = await Blog.findById(request.params.id)
		if (blogUser.user.toString() !== requestUser.id.toString()) {
			return response.status(401).json({ error: 'Invalid user' })
		}

		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'Token missing or invalid' })
		}

		const user = await User.findById(decodedToken.id)

		const newBlog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user.id
		}

		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
		if (updatedBlog) {
			response.json(updatedBlog.toJSON())
		} else {
			response.status(404).end()
		}
	} catch (exception) {
		next(exception)
	}
})

module.exports = blogsRouter