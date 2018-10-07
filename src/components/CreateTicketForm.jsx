import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import {getUsers} from '../actions/users'
import {getEvents} from '../actions/events'
import {createTicket} from '../actions/ticket'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class CreateTicketForm extends PureComponent {

  state = {
    eventId: Number(this.props.match.params.id),
    userId: this.props.userId,
    price: null,
    imageURL: "",
    description: "",
    createdAt: ""
  }
  
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers()
    }
    if (this.props.events.allEvents.length === 0) this.props.getEvents()
  }


  onChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    let currentDate = new Date()
    let date = currentDate.getDate()
    let month = currentDate.getMonth()
    let year = currentDate.getFullYear()
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    let seconds = currentDate.getSeconds()
    let timestamp = `${year}-${this.formatDate(month + 1)}-${this.formatDate(date)} ${this.formatDate(hours)}:${this.formatDate(minutes)}:${this.formatDate(seconds)}`

    this.setState(
      {[name]: value, createdAt: timestamp})
  }

  formatDate(n) {
    return n<10 ? '0'+n : n;
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createTicket(this.state)
    event.target.reset()

  }

	render() {
		return (
			<div className="create-ticket-page">
        <Link to={`/events/${this.props.match.params.id}`} style={{textDecoration:"none"}}>
          <button className="back-to-tickets">Back to Tickets</button>
        </Link>
        <div className="add-new-ticket-wrapper">
          <h1>Add a new ticket:</h1>
          <form className="create-ticket-form" onSubmit={this.onSubmit}>
            <div className="new-ticket-input">
              <label htmlFor="ticket-price-input">Price:</label>
              <input name="price" id="ticket-price-input" type="number" onChange={this.onChange}/>
            </div>
            <div className="new-ticket-input">
              <label htmlFor="ticket-picture-input">Picture URL:</label>
              <input name="imageURL" id="ticket-picture-input" type="text" onChange={this.onChange}/>
            </div>
            <div className="new-ticket-input">
              <label htmlFor="ticket-description-input">Description:</label>
              <input name="description" id="ticket-description-input" type="text" onChange={this.onChange}/>
            </div>
            <button type="submit" className="submit-new-ticket">Submit</button>
          </form>
        </div>
      </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		events: state.events,
		authenticated: state.currentUser !== null,
		userId: state.currentUser && userId(state.currentUser.jwt),
		users: state.users
	}
}

const mapDispatchToProps = {
    getUsers,
    getEvents,
    createTicket
	}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicketForm)
