const blogs = [
	{
		title: "Test-title",
		author: "Test-author",
		url: "Test-url",
		likes: 42,
		user: [{
			name: "Test-user",
			username: "Test-username"
		}]
	},
	{
		title: "Testeriino",
		author: "Test le test",
		url: "Wululululuu",
		likes: 33,
		user: [{
			name: "Suser",
			username: "Susername"
		}]
	}
]

const getAll = () => {
	return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll, setToken }