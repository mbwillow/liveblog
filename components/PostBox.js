import React from 'react'

export default class PostBox extends React.Component {

	constructor(){
		super()

		this.state = {
			text: '',
			isSaving: false
		}
	}

	OnCreatePost(status){

		this.setState({isSaving:true})

		let post = {
				status: status,
				content: this.state.text,
				format: 'status',
				title: this.state.text.replace( /^(.{50}[^\s]*).*/, "$1")
		}

		window.apiHandler.post( '/wp/V2/posts', post)
			.then( post => {
				this.setState({ isSaving: false, text: ''})
				this.props.onDidPublish( post )
			})


	}

	render(){

		return <form className="PostBox">
			<div className="user-detail">
				<img src={this.props.user.avatar_urls[96]}/>
				You
			</div>
			<textarea 
				disabled={this.state.isSaving}
				rows="4"
				value={this.state.text}
				onChange={e => this.setState( { text: e.target.value } )}

			/>

			{this.state.isSaving ?

				<p> Saving...</p>

				:
			
				<p className="actions">

					{ this.props.user.capabilities.publish_posts ?

						<span>
						<button className="secondary"
							onClick={ ( ) => this.OnCreatePost( 'pending' )}
						>Submit for review</button>
						<button className="primary"
							onClick={ ( ) => this.OnCreatePost( 'publish' )}
						>Publish</button>
						</span>

						:

						<button className="primary"
							onClick={ ( ) => this.OnCreatePost( 'pending' )}
						>Submit for review</button>
					}

				</p>
			}

		</form>

	}

}

PostBox.propTypes ={
	user:React.PropTypes.object.isRequired,
	onDidPublish: React.PropTypes.func.isRequired,
}