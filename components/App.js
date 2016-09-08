import React from 'react'
import api from 'wordpress-rest-api-oauth-1'
import Header from './Header'
import PostsList from './PostsList'

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
			user: null
		}

		window.apiHandler = new api ({
			url: SITE_URL,
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

	}

	componentDidMount(){
		this.loadPosts()
	}



	loadPosts(){

		this.setState({ isLoadingPosts: true })

		let args = { 
			_embed : true ,
			per_page: 100,
			status: this.state.user ?  'any' : 'publish',
			context: this.state.user ?  'edit' : 'view'

		}

		window.apiHandler.get( '/wp/V2/posts', args)
			.then( posts => this.setState({posts, isLoadingPosts: false}) )
	}

	onLogin(){

		window.apiHandler.authorize()
		.then( () => this.onLoggedIn() )
	}

	onLogout(){
		this.setState({user:null}, () => this.loadPosts() )
		window.apiHandler.removeCredentials()
	}

	onLoggedIn() {
		window.apiHandler.get('/wp/v2/users/me', {_envelope: true})
			.then(data => data.body)
			.then(user => this.setState({ user }))
			.then( () => this.loadPosts() )
			
	}

	render() {
		return <div className = "app">
			<Header
				user={this.state.user}
				onLogin={() => this.onLogin()}
				onLogout={() => this.onLogout()}
			/>			
			<div className="posts">
				<PostsList 
					isLoadingPosts={this.state.isLoadingPosts}
					posts={this.state.posts} 
					showFilter={!!this.state.user}/>
			</div>
		</div>		
	}
}
