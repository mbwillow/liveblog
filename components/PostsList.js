import React from 'react'
import Post from './Post'

export default class PostsList extends React.Component {

	constructor() { 
		super()
		this.state = {
			filter: 'all'
		}
	}

	render(){
		let posts = this.props.posts

		if ( this.state.filter !== 'all') {
			posts = posts.filter(post => post.status === this.state.filter)
		}

		return <div className="PostsList">
			
					<p className="post-filter">

						{this.props.showFilter ?
							
								<span className="group">
								Filter:
								<a
									className={this.state.filter === 'all' ? 'active' : ''}
									onClick={() => this.setState({filter:'all'})}
									>All</a>
								<a
									className={this.state.filter === 'all' ? 'active' : ''}
									onClick={() => this.setState({filter:'pending'})}
									>Pending</a>
								</span>

						: null}

						{this.props.isLoadingPosts ?

								<span className="loading-status">
									Loading Posts ...
								</span>

						: null}	
					</p>


						{this.props.isLoadngPosts === false && posts.length === 0 ?

							<p>No posts have been published, stand by ...</p>

						 : null}					


					{posts.map(post=> {
							return <Post
								user={this.props.user} 
								key={post.id} 
								post={post}
								onRejectPost = {this.props.onRejectPost}
								onApprovePost = {this.props.onApprovePost}	
								/>
					})}
		</div>
	}

}