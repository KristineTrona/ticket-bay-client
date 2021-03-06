import React from 'react'
import {Link} from 'react-router-dom'

export default function eventsPage(props){
	if (props.events.length !== 0){
	return (
		<div className = "events-page">
			<div className="events-page-top">
				<h1>Events</h1>
				{props.user &&
				<Link to={"/create-event"} style={{textDecoration: "none"}}><button className="add-new-event">New event</button></Link>
			}
			</div>
			<div className = "events-wrapper">
				{props.events.map(event => 
				<Link to={`events/${event.id}`} style={{textDecoration: "none", color: "inherit"}} key={event.name}>
					<div className= "event-div"> 
						<h4>{event.name}</h4>
						<img src={event.imageURL} alt=""/>
					</div>
				</Link>)}
			</div>
		</div>)} else{
			return(
				<div className="events-page-not-loaded">
					<div class="loading">
						<p>It can take a few seconds for the site to load - stick around :)</p>
    				<div class="loading__anim"></div>
					</div>
				</div>
			)}
} 

