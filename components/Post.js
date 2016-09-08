//components/Post.js

import React from 'react'
import PostActions from './PostActions'

export default class Post extends React.Component{

	render() {
		let date = this.props.post.date.split('T')[1].slice(0,5)
		return <div className="Post">
			<div 
				dangerouslySetInnerHTML = { {__html:this.props.post.content.rendered}} 
			/>
		
			<div className="date">
				{this.props.post.status === 'pending' ? 
					<span className="label">Pending</span>
				 : 
					<span>{date}</span>
				}
			</div>

			{this.props.post._embedded.author[0].name ?

					<div className="user-detail">

							<img 
								className="avatar" 
								src={this.props.post._embedded.author[0].avatar_urls[48]}
							/>
								
							{this.props.post._embedded.author[0].name}
					</div>

					:null
			}

			<PostActions
				user={this.props.user}  
				onRejectPost = {this.props.onRejectPost}
				onApprovePost = {this.props.onApprovePost}
				post= { this.props.post }
				 />

		</div>

	}
}