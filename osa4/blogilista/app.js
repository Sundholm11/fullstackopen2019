const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.set('useCreateIndex', true)

console.log('Connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('Error connection to MongoDB:', error.message)
	})

app.use(cors())
app.use(bodyParser.json())

if(process.env.NODE_ENV !== 'test') {
	console.log("Initializing morgan logger")
	morgan.token('blogpost', (req) => {
		return JSON.stringify(req.body)
	})
	app.use(morgan(':method :url :status :res[content-length] :response-time ms :blogpost'))
}

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app