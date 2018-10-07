import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import {getUsers} from '../actions/users'
import {getEventDetails, getEvents} from '../actions/events'
import {connect} from 'react-redux'
import EventDetails from './EventDetails'
import {calculateRisk} from './TicketDetails'

class EventDetailsContainer extends PureComponent {

	componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers()
    }
    if (this.props.events.allEvents.length === 0) this.props.getEvents()
  }

  componentDidMount(){
    this.props.getEventDetails(Number(this.props.match.params.id))

  }

  calculateRiskColor = (eventTickets, selectedTicket, allEvents) => {
    let risk = 5

    let allTicketArrays = allEvents.map(event => event.tickets)
    let allTickets = [].concat.apply([], allTicketArrays)
  
    if (allTickets.filter(ticket => ticket.user.id===selectedTicket.user.id).length === 1){
      risk = risk + 10
    }
    //Checking if the price of the ticket is higher or lower than the abverage ticket price for the event:
    let arrayOfPrices = eventTickets.map(ticket => ticket.price)
    let averagePrice = arrayOfPrices.reduce((acc, curr) => acc+curr)/arrayOfPrices.length
  
    if (selectedTicket.price < averagePrice){
      risk = risk + (averagePrice-selectedTicket.price)
    }
  
    if (selectedTicket.price > averagePrice){
      risk = risk - (selectedTicket.price- averagePrice)
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

    const riskColour = (risk) => {
        if(risk <= 25){
          return "#bfe59e"
        }
        else if (risk > 25 && risk <= 50){
          return "#f7f49e"
        }
        else{
          return "#efc2ae"
        }
    }  
    return riskColour(risk)
  }
	
	render() {
		return (
				<EventDetails event={this.props.events.selectedEvent} user={this.props.authenticated}
          calculateRiskColor={this.calculateRiskColor} events={this.props.events.allEvents}/>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		events: state.events,
		authenticated: state.currentUser !== null,
		userId: state.currentUser && userId(state.currentUser.jwt),
		users: state.users,
	}
}

const mapDispatchToProps = {
    getUsers,
    getEventDetails,
    getEvents,
    calculateRisk
	}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer)
