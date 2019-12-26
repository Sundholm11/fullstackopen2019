describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			username: 'TrueTester',
			name: 'Riley Test',
			password: '987654'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})
	it('Front page can be opened', function() {
		cy.contains('Blogs')
	})
	it('User can login', function() {
		cy.get('#username')
			.type('TrueTester')
		cy.get('#password')
			.type('987654')
		cy.contains('Submit')
			.click()
		cy.contains('Riley Test logged in')
	})
	
	describe('When logged in', function() {
		beforeEach(function() {
			cy.get('#username')
				.type('TrueTester')
			cy.get('#password')
				.type('987654')
			cy.contains('Submit')
				.click()
		})
		it('Name of the logged in user is shown', function() {
			cy.contains('Riley Test logged in')
		})
		it('A new blog can be created', function() {
			cy.contains('Create New Blog')
				.click()
			cy.contains('Open blog form')
				.click()
			cy.get('#title')
				.type('Cypress testing adding new blog')
			cy.get('#author')
				.type('Cyber Cypress')
			cy.get('#url')
				.type('testtest')
			cy.get('#submit')
				.click()
			cy.contains('Cypress testing adding new blog')
		})
		it('Users page renders properly', function() {
			cy.contains('Users')
				.click()
			cy.contains('All users listed for you')
		})
	})
})