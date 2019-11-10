import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test(`Little detail, full detail, both work intended`, () => {
	const blog = {
		title: "Test-title",
        author: "Test-author",
        url: "Test-url",
        likes: 42,
        user: [{
            name: "Test-user",
            username: "Test-username"
        }]
    }

    const component = render(
        <Blog blog={blog} user="Test-user" />
    )

    const div = component.container.querySelector('.moreDetail')
    expect(div).toHaveStyle('display:none')
    fireEvent.click(div)
    expect(div).not.toHaveStyle('display:none')
})