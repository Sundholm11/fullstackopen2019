import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Simpleblog from './Simpleblog'

test('Renders title, author and likes', () => {
	const blog = {
		title: "Test-title",
		author: "Test-author",
		likes: 42
	}

	const component = render(
		<Simpleblog blog={blog} />
	)

	expect(component.container).toHaveTextContent(
		'Test-title'
	)

	expect(component.container).toHaveTextContent(
		'Test-author'
	)

	expect(component.container).toHaveTextContent(
		'blog has 42 likes'
	)
})

test(`Clicking 'like' twice calls event handler twice`, async () => {
	const blog = {
		title: "Test-title",
		author: "Test-author",
		likes: 42
	}

	const mockHandler = jest.fn()

	const { getByText } = render(
		<Simpleblog blog={blog} onClick={mockHandler} />
	)

	const button = getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)
})