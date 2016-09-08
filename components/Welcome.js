import React from 'react'

export default class Welcome extends React.Component {
	constructor(){
		super()
		this.state = {
			url: ''
		}

	}
	render() {
		return <div className="app Welcome">
					<div className="branding">
						<img src="images/logo.png"/>
					</div>
					<p>Welcome to my Liveblog App!</p>
					<form className="site-select"
						onSubmit={ e => {e.preventDefault(); 
							this.props.onConnect(this.state.url)}
						}>
						<input
							placeholder="Your site URL"
							required
							type="url"
							onChange={ e => this.setState({ url : e.target.value} )}
						/>
						<button className="primary">Connect</button>
					</form>
				</div>
			}
}