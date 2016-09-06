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
			{this.props.showFilter ?

					<p className="post-filter">
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
					</p>
				: null}

			{posts.map(post=> {
				return <Post key={post.id} post={post}/>
			})}
		</div>
	}

}