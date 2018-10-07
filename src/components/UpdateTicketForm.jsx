import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import {updateTicket} from '../actions/ticket'
import {connect} from 'react-redux'


class UpdateTicketForm extends PureComponent {

  state = {

  }
  

  onChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState(
      {[name]: value})
  }

  onSubmit = (event) => {
    this.props.updateTicket(this.props.ticket.id, this.state)
    event.target.reset()
  }

	render() {
		return (
			<div className="update-ticket-page">
        <h2>Update your ticket:</h2>
        <form className="update-ticket-form" onSubmit={this.onSubmit}>
          <div className="edit-ticket-input">
            <label htmlFor="ticket-price-edit">Price:</label>
            <input name="price" id="ticket-price-edit" type="number" onChange={this.onChange}/>
          </div>
          <div className="edit-ticket-input">
            <label htmlFor="ticket-picture-edit">Picture URL:</label>
            <input name="imageURL" id="ticket-picture-edit" type="text" onChange={this.onChange}/>
          </div>
          <div className="edit-ticket-input">
            <label htmlFor="ticket-description-edit">Description:</label>
            <input name="description" id="ticket-description-edit" type="text" onChange={this.onChange}/>
          </div>
          <button type="submit" className="submit-ticket-edit">Submit</button>
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
    updateTicket
	}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTicketForm)
