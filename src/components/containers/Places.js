import React, { Component } from 'react';


class Places extends Component{

	render(){

		const list = this.props.venues.map((venue, i) => {
			return (
				<li style={{background:"#f4f4f4", padding:"24px", marginTop:12, marginBottom:12, fontWeight:"bold"}} key={i}>{venue.name}</li>
			)
		})

		return (
			<div>
				<ol style={{listStyle:"none"}}>
					{list}
				</ol>

			</div>
		)
	}
}

export default Places;