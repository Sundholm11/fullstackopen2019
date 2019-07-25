const listHelper = require('../utils/test_helper')

test('Dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe("Total likes", () => {
	test("Empty list is zero", () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})

	test("When list has only one blog equals the likes of that", () => {
		const listWithOneBlog = [
			{
				id: "5d2da4e80d3846184042a82c",
				title: "One blog onleh",
				author: "Timmy Test",
				url: "totallyrelevanturladdress",
				likes: 99
			}
		]
		expect(listHelper.totalLikes(listWithOneBlog)).toBe(99)
	})

	test("When list has more than one blog equals correct", () => {
		const blogs = listHelper.initialBlogs
		expect(listHelper.totalLikes(blogs)).toBe(36)
	})
})

describe("Favorite blog", () => {
	test("Only one blog", () => {
		expect(
			listHelper
				.favoriteBlog([
					{
						id: "5d2da4e80d3846184042a82c",
						title: "One blog onleh",
						author: "Timmy Test",
						url: "totallyrelevanturladdress",
						likes: 99
					}
				]))
			.toEqual(
				{
					id: "5d2da4e80d3846184042a82c",
					title: "One blog onleh",
					author: "Timmy Test",
					url: "totallyrelevanturladdress",
					likes: 99
				}
			)
	})

	test("More than one blog", () => {
		const blogs = listHelper.initialBlogs
    expect(listHelper.favoriteBlog(blogs))
      .toEqual(blogs[2])
	})
})