import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
	return (
		<div>
			<h2 className="ui header">Users
				<div className="sub header">All users listed for you</div>
			</h2>
			<div className="ui grid">
				<div className="center aligned row">
					<div className="three wide column"><b>Users</b></div>
					<div className="three wide column"><b>Blogs created</b></div>
				</div>
				{users.map(user =>
					<div className="center aligned row" key={user.id}>
						<div className="three wide column"><Link to={`/users/${user.id}`}>{user.name}</Link></div>
						<div className="three wide column">{user.blogs.length}</div>
					</div>)}
			</div>
		</div>
	)
}

export default UserList