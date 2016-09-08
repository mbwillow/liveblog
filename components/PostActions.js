import React from 'react'

export default class PostActions extends React.Component {
	constructor(){
		super()
		this.state = {
			liked: false, 
		}
	}

	onLikePost(){
		this.setState({liked:true})
		this.props.onLikePost(this.props.post)

	}

	render() {
			let {post} = this.props
				if( post.status === 'publish' && typeof post.liveblog_likes === 'number' ) {

					return <div className="actions">
								<div className="likes-container">
									<span className="likes-counter">{ post.liveblog_likes  ? post.liveblog_likes : '' }
									</span>
									<button 
									aria-label="like"
									disabled={this.state.liked}
									className="action-like"
									onClick={ () => this.onLikePost() }
									>{this.state.liked ? <span>&hearts;</span> : <span>&#9825;</span>}
									</button>
								</div>
							</div>

		   } else if ( this.props.user && this.props.user.capabilities.publish_posts ){

				return <div className="actions">

				<button className="secondary"
					onClick={ () => this.props.onRejectPost ( this.props.post)}
					>Discard
				</button>

				<button className="primary"
					onClick={ () => this.props.onApprovePost ( this.props.post)}
				>Publish
				</button>
				</div>
		}else  {

			return null
		}

	}
}