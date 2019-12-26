import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
	test('if no user logged, blogs are not rendered', async () => {

		const component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(() => component.getByText('Login'))

		const blogsBeforeLogin = component.container.querySelectorAll('.blog')
		expect(blogsBeforeLogin.length).toBe(0)

	})
	test('blogs are rendered when logged in', async () => {
		const user = {
			username: 'Totallynotatestuser',
			token: '1231231214',
			name: 'Donald Duck'
		}

		localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

		const component = render(
			<App />
		)

		await waitForElement(() => component.container.querySelector('.blog'))
		const blogsAfterLogin = component.container.querySelectorAll('.blog')

		expect(blogsAfterLogin.length).toBe(2)

		expect(component.container).toHaveTextContent("Test-title")

		expect(component.container).toHaveTextContent("Testeriino")
	})
})