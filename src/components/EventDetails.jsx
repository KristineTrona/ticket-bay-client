import React from 'react'
import {Link} from 'react-router-dom'

export default function eventDetails(props){
  if(props.event===null){
    return <h1> Loading... </h1>
  } else {
	return (
		<div className = "event-tickets-page">
      <Link to="/events" style={{textDecoration: "none"}}>
        <button className="tickets-to-events"> Back to Events</button>
      </Link>
      <div className="event-description">
        <h1>Event: {props.event.name}</h1>
        {props.event.description}
      </div>
      <div className="risk-level-legend">
        <div className="legend-label-wrapper">
          Low risk: {" "} <div className="risk-level" style={{backgroundColor: "#bfe59e"}}></div>{" "}
          Medium risk: {" "} <div className="risk-level" style={{backgroundColor: "#f7f49e"}}></div>{" "}
          High risk: {" "} <div className="risk-level" style={{backgroundColor: "#efc2ae"}}></div></div>{" "}
      </div>
      <div className="ticket-list-wrapper">
        <div className = "event-details-headers">
          <h3>Name</h3>
          <h3>Price</h3>
          <h3>Description</h3>
        </div>    
        { props.event.tickets.map(ticket =>
          <Link to={`${props.event.id}/tickets/${ticket.id}`} key={ticket.id} style={{textDecoration: "none", color: "inherit"}}>
            <div className="tickets-wrapper" >
              <div id="username-ticket" style={{backgroundColor: props.calculateRiskColor(props.event.tickets, ticket, props.events)}}>
                {ticket.user.username}
              </div>
              <div id="price-ticket" style={{backgroundColor: props.calculateRiskColor(props.event.tickets, ticket, props.events)}}>
                &euro; {ticket.price}
              </div>
              <div style={{padding: 5, backgroundColor: props.calculateRiskColor(props.event.tickets, ticket, props.events)}}>
                {ticket.description}
              </div>
            </div>
          </Link>)}
          {props.user &&
			      <Link to={`/events/${props.event.id}/create-ticket`} style={{textDecoration: "none"}}>
              <button className="add-new-ticket">Add Ticket</button>
            </Link>
			    } 
        </div>    
    </div>)
  }
} 
