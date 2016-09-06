import React from 'react'
import MainContent from './MainContent'

export default class App extends React.Component {
	render() {
		let title = "More like A Week of AWESOME"
		let content = "Ask questions, please!"
		return <MainContent
			title={title}
			content={content}
		/>

		// Before:
		return <div>
			<h1>Title</h1>
			<p>Content</p>
		</div>
	}
}
