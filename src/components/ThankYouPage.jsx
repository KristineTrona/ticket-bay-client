import React from 'react'
import {Link} from 'react-router-dom'

export default function ticketBought(){
	return (
		<div className = "thank-you-page">
      <div className="thank-you-content">
        <h1>Thank you for choosing Ticket-bay!</h1>
        <h3>We will process your transaction and a car will be there to pick you up for the event!</h3>
        <Link to="/events" style={{textDecoration: "none"}}><button className="thank-you-to-events">Back to Events</button></Link>
      </div>
    </div>
    )
} 
