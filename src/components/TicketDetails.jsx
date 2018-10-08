import React from 'react'
import {Link} from 'react-router-dom'
import UpdateTicketForm from './UpdateTicketForm';

export const riskRangeCheck = (risk) => {
  if(risk <= 5){
    return <span style={{color: "green"}}>{5}%</span>
  }else if(risk >= 95){
    return <span style={{color: "red"}}>{95}%</span>
  }else{
    if(risk > 5 && risk <= 25){
      return <span style={{color: "green"}}>{risk.toFixed(0)}%</span>
    }
    else if (risk > 25 && risk <= 50){
      return <span style={{color: "#f4a742"}}>{risk.toFixed(0)}%</span>
    }
    else{
      return <span style={{color: "#e54b4b"}}>{risk.toFixed(0)}%</span>
    }
  }
}

export const calculateRisk = (eventTickets, selectedTicket, allEvents) => {
  let risk = 5
  //Checking if author is selling only 1 ticket:
  let allTicketArrays = allEvents.map(event => event.tickets)
  let allTickets = [].concat.apply([], allTicketArrays)

  if (allTickets.filter(ticket => ticket.user.id===selectedTicket.user.id).length === 1){
    risk = risk + 10
  }
  //Checking if the price of the ticket is higher or lower than the abverage ticket price for the event:
  let arrayOfPrices = eventTickets.map(ticket => ticket.price)
  let averagePrice = arrayOfPrices.reduce((acc, curr) => acc+curr)/arrayOfPrices.length

  if (selectedTicket.price < averagePrice){
    risk = risk + ((averagePrice-selectedTicket.price)/averagePrice)
  }

  if (selectedTicket.price > averagePrice){
    risk = risk - ((selectedTicket.price- averagePrice)/averagePrice)
  }
  //Checking if ticket was added during office hours or not:
  let ticketDate= new Date(selectedTicket.createdAt)
  let hours = ticketDate.getHours()
  let minutes = ticketDate.getMinutes()
  let seconds = ticketDate.getSeconds()
  let timestring = `${hours}:${minutes}:${seconds}`
  
  if(timestring > "09:00:00" && timestring < "17:00:00"){
    risk = risk - 10
  } else {
    risk = risk +10
  }
  //Checking if the ticket has more than 3 comments:
  if(selectedTicket.comments.length > 3){
    risk = risk +5
  }

  return riskRangeCheck(risk)
}

export default function ticketDetails(props){
  if(props.ticket===null){
    return <h1> Loading... </h1>
  } else {
	  return (
	  	<div className = "ticket-details-page">
        <div className="buttons-wrapper-tickets">
          <Link style={{textDecoration: "none"}} to={`/events/${props.eventId}`}><button className="back-to-tickets">Back to tickets</button></Link>
          { props.user && props.userId === props.ticket.user.id && props.editMode === false &&
            <button className="edit-ticket-button" onClick={props.onClick}>Edit ticket</button>
          }
          { props.user && props.userId === props.ticket.user.id && props.editMode === true &&
            <button className="edit-ticket-button" onClick={props.onClick}>Close edit mode</button>
          }
        </div>
        <div className="ticket-details-content">
          <h1>Ticket from {props.ticket.user.username}</h1>
          {
            props.events.selectedEvent !== null && props.ticket !== null && props.events.allEvents !== null &&
            <h2 style={{textAlign: "center"}}>Risk: {" "} 
            {calculateRisk(props.events.selectedEvent.tickets, props.ticket, props.events.allEvents)}</h2>
          }
          <h1> Price: &euro; {props.ticket.price}</h1>
            <div className="ticket-info-wrapper">
            {
              props.ticket.imageURL &&
              <img className="ticket-image" src={props.ticket.imageURL} alt=""/>
            }
              <div className="ticket-description">{props.ticket.description}</div>
            </div>
            <Link to="/ticket-bought" style={{textDecoration: "none"}}>
              <button className="buy-ticket-button">Buy this ticket</button>
            </Link>
            {
              props.editMode===true &&
              <UpdateTicketForm ticket={props.ticket} editMode={props.editMode}/>
            }
          <div className="comments-wrapper">
            <h1 style={{textAlign: "left"}}>Comments</h1>
            {
              props.ticket.comments.length === 0 &&
              <div>There are currently no comments for this ticket</div>
            }
              {props.ticket.comments.map(comment =>
                <div className="comment" key={comment.id}>
                  <div className="comment-author">{comment.user.username}: </div>
                  <div className="comment-test">{comment.text}</div>
                </div>)}
          </div>
          </div>       
      </div>
    )
  }
} 
