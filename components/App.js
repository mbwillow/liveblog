import React from 'react'
import api from 'wordpress-rest-api-oauth-1'
import Header from './Header'
import PostsList from './PostsList'
import PostBox from './PostBox.js'
import Welcome from './Welcome'

const SITE_URL = 'http://awor.local/'
const API_KEY = 'JTFiOCfq1eGE'
const API_SECRET = 'R5ZP9OEJpX0zPAYfSgCtCqisDH8eVdRlSb5W66eTDnjmlW03'
const CALLBACK_URL = 'http://localhost:3000/'
const BROKER_URL = 'http://awor.local/auth-broker/'


export default class App extends React.Component {

	constructor(){
		super()

		this.state = {
			posts: [],
			isLoadingPosts: false,
			user: null,
			url: ''

		}		

	}

	componentWillMount(){

		let url = localStorage.getItem('url')
		if (url){
			this.onConnect(url)
		}
		
	}

	componentWillUnmount(){
		clearInterval( this.interval )
	}



	loadPosts(){

		this.setState({ isLoadingPosts: true })

		let args = { 
			_embed : true ,
			per_page: 10,
			status: this.state.user ?  'any' : 'publish',
			context: this.state.user ?  'edit' : 'view'

		}

		window.apiHandler.get( '/wp/V2/posts', args)
			.then( posts => {
				posts = posts.map(post => {

					if(!post.status){
						post.status = 'publish'}
					return post
				})
					this.setState({posts, isLoadingPosts: false}) 
				})
	}

	onConnect(url){

		this.setState({url})
		localStorage.setItem('url', url)

		window.apiHandler = new api ({
			url: url,
			brokerURL: BROKER_URL,
			brokerCredentials: {
				client: {
					public: API_KEY,
					secret: API_SECRET
				}
			},
			callbackURL: CALLBACK_URL
		})

		window.apiHandler.restoreCredentials()

		if (window.apiHandler.hasCredentials() ){
			this.onLoggedIn()
		}else if (window.apiHandler.hasRequestToken() ){
			this.onLogin()
		}

		this.loadPosts()
		this.interval = setInterval( () => this.loadPosts(), 8000)


	}

	onLogin(){

		window.apiHandler.authorize()
			.then( () => this.onLoggedIn() )
	}

	onLogout(){
		this.setState({user:null})
		window.apiHandler.removeCredentials()
	}

	onLoggedIn() {
		window.apiHandler.get('/wp/v2/users/me', {_envelope: true, context: 'edit'})
			.then(data => data.body)
			.then(user => this.setState({ user }))
			.then( () => this.loadPosts() )
			
	}

	onRejectPost (post){

		window.apiHandler.del('/wp/V2/posts/' + post.id)
			.then ( () => this.loadPosts() )

	}


	onApprovePost (post){		

		window.apiHandler.post('/wp/V2/posts/' + post.id, 
			{status:'publish'})
			.then ( () => this.loadPosts() )
	}

	onLikePost(post){
			window.apiHandler.post('/liveblog-likes/V1/posts/' + post.id + '/like')
				.then( response =>{

					this.setState({
						posts: this.state.posts.map( p => {
							if ( p.id !== post.id ) {

								return p
							}

							p.liveblog_likes = response.count


							return p

						})
					})
				})

	}

	onSwitchSite(){
		this.setState({url:''})
		window.apiHandler.removeCredentials()
		localStorage.removeItem('url')
	}


	render() {

		if ( ! this.state.url ){

			return <Welcome 
				onConnect={ url => this.onConnect (url) } 
			/>
		}		
				return <div className = "app">
					<Header
						user={this.state.user}
						onLogin={() => this.onLogin()}
						onLogout={() => this.onLogout()}
						onSwitchSite={() => this.onSwitchSite()}
					/>	
					

					<div className="posts">
						
						{this.state.user && this.state.user.capabilities.edit_posts ?
							<PostBox 
								user={this.state.user}
								onDidPublish={ post => { 
									this.loadPosts()
									} 
								}
								/>
						: null }

						<PostsList 
							user = {this.state.user}
							posts={this.state.posts} 
							isLoadingPosts={this.state.isLoadingPosts}					
							showFilter={this.state.user}
							onRejectPost = { post => this.onRejectPost(post)}
							onApprovePost = { post => this.onApprovePost(post)}
							onLikePost = {post => this.onLikePost(post)}
						/>					
				</div>	
			</div>	

		
	}
}
