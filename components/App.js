import React from 'react'
import api from 'wordpress-rest-api-oauth-1'
import Header from './Header'
import PostsList from './PostsList'


const SITE_URL = 'http://awor.local/'

export default class App extends React.Component {

	constructor(){
		super()

		this.state = {
			posts: [],
			isLoadingPosts: false
		}

		window.apiHandler = new api ({
			url : SITE_URL
		})

	}

	componentDidMount(){
		this.loadPosts()
	}



	loadPosts(){

		this.setState({ isLoadingPosts: true })

		let args = { _embed : true }

		window.apiHandler.get( '/wp/V2/posts', args)
			.then( posts => this.setState({posts, isLoadingPosts: false}) )
	}

	render() {
		return <div className = "app">
			<Header/>			
			<div className="posts">
				<PostsList 
					isLoadingPosts={this.state.isLoadingPosts}
					posts={this.state.posts} 
					showFilter={true}/>
			</div>
		</div>		
	}
}
