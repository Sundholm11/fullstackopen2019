import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import LoggedIn from '../components/LoggedIn'

const Menu = () => {
	const [ activeItem, setActiveItem ] = useState("home")

	const handleItemClick = (name) => {
		setActiveItem(name)
	}

	return (
		<div className="ui pointing menu">
			<Link
				className={activeItem === "home" ? "active item" : "item"}
				onClick={() => handleItemClick("home")}
				to="/">Home/Bloglist
			</Link>
			<Link
				className={activeItem === "create" ? "active item" : "item"}
				onClick={() => handleItemClick("create")}
				to="/create">Create New Blog
			</Link>
			<Link
				className={activeItem === "users" ? "active item" : "item"}
				onClick={() => handleItemClick("users")}
				to="/users">Users
			</Link>
			<div className="right menu">
				<LoggedIn />
			</div>
		</div>
	)
}

export default Menu