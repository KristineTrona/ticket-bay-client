import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import {getUsers} from '../actions/users'
import {getEvents, createEvent} from '../actions/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class CreateEventForm extends PureComponent {

  state = {
    name: "",
    imageURL: "",
    description: "",
    startDate: "",
    endDate: ""
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

    this.setState(
      {[name]: value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createEvent(this.state)
    event.target.reset()

  }

	render() {
		return (
			<div className="create-event-page">
        <Link to="/events" style={{textDecoration: "none"}}>
          <button className="back-to-events">Back to Events</button>
        </Link>
        <h1>Add a new event:</h1>
        <form className="create-event-form" onSubmit={this.onSubmit}>
          <div className="new-event-input">
            <label htmlFor="event-name-input">Name:</label>
            <input name="name" id="event-name-input" type="text" onChange={this.onChange}/>
          </div>
          <div className="new-event-input">
            <label htmlFor="event-picture-input">Picture URL:</label>
            <input name="imageURL" id="event-picture-input" type="text" onChange={this.onChange}/>
          </div>
          <div className="new-event-input">
            <label htmlFor="event-description-input">Description:</label>
            <input name="description" id="event-description-input" type="text" onChange={this.onChange}/>
          </div>
          <div className="new-event-input">
            <label htmlFor="event-start-input">Start Date:</label>
            <input name="startDate" id="event-start-input"type="date" onChange={this.onChange}/>
          </div>
          <div className="new-event-input">
            <label htmlFor="event-end-input">End Date:</label>
            <input name="endDate" id="event-end-input" type="date" onChange={this.onChange}/>
          </div>
          <button className="submit-new-event" type="submit">Submit</button>
        </form>
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
    createEvent
	}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm)
