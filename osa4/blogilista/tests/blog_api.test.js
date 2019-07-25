const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const blogPromiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(blogPromiseArray)
})

test('Correct amount of blogs returned', async () => {
	const results = await api.get('/api/blogs')

	expect(results.body.length).toBe(helper.initialBlogs.length)
})

test(`Attribute field 'id' is defined as 'id' in all blogs`, async () => {
	const response = await api.get('/api/blogs')

	const idFields = response.body.map(r => r.id)
	idFields.forEach(id => expect(id).toBeDefined())
})

test('A blog can be added', async () => {
	const newBlog = {
		id: "5d2da4e80d3846184042a82c",
		title: "One blog onleh",
		author: "Timmy Test",
		url: "totallyrelevanturladdress",
		likes: 99
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsFetched = await helper.blogsInDb()
	expect(blogsFetched.length).toBe(helper.initialBlogs.length + 1)
	const blogTitles = blogsFetched.map(blog => blog.title)
	expect(blogTitles).toContain(
		'One blog onleh'
	)
})

test(`All blogs have a value on 'likes'`, async () => {
	const invalidBlog = {
		author: "Timmy Test",
	}
	await api
		.post('/api/blogs')
		.send(invalidBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsFetched = await helper.blogsInDb()
	const blogLikes = blogsFetched.map(blog => blog.likes)
	console.log(blogsFetched)

	blogLikes.forEach(likes => expect(likes).toBeDefined())
})

test(`'Status 400' response if blog requirements not met`, async () => {
	const invalidBlog = {
		author: "Timmy Test",
	}
	await api
		.post('/api/blogs')
		.send(invalidBlog)
		.expect(400)
	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('Blog can be removed', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
})

test('Blog can be updated', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const updateBlog = blogsAtStart[0]
	updateBlog.likes = 42

	await api
		.put(`/api/blogs/${updateBlog.id}`)
		.send(updateBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.length).toBe(blogsAtStart.length)
	const blogsLikes = blogsAtEnd.map(blog => blog.likes)
	expect(blogsLikes).toContain(42)
})

afterAll(() => {
	mongoose.connection.close()
})