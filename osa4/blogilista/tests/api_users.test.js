const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

describe('Creating an user with', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const user = new User({ username: 'root', password: 'sekret' })
		await user.save()
	})

	test('Too short username fails', async () => {
		const newUser = {
			username: 'us',
			name: 'Dummy',
			password: 'testpassword'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('User validation failed')
	})

	test('Too short password fails', async () => {
		const newUser = {
			username: 'Testuser',
			name: 'Dummy',
			password: 't'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password too short')
	})

	test('A fresh username succeeds', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'freshname',
			name: 'Fritz McFreshy',
			password: 'Veryfreshpasswordaswell',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('Username already taken fails', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})