import React from 'react'

export default class Header extends React.Component {
	render() {
		return 	<header className="Header">
					<img src="images/logo.png" />
					<p className="actions">
						{this.props.user ?
							<button  onClick={() => this.props.onLogout()} className= "logout">Log Out</button>
						:
							<button onClick={() => this.props.onLogin()} className= "login">LogIn</button>
						}
					</p>
				</header>
	}
}

Header.propTypes = {
	onLogin: React.PropTypes.func.isRequired,
	onLogout: React.PropTypes.func.isRequired,
	user: React.PropTypes.object
}