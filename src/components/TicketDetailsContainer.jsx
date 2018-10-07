import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import {getUsers} from '../actions/users'
import {getEvents, getEventDetails} from '../actions/events'
import {getTicketDetails} from '../actions/ticket'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'
import CreateCommentForm from './CreateCommentForm'
import {createComment} from '../actions/ticket'

class TicketDetailsContainer extends PureComponent {

  state = {
    editMode: false
  }

	componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers(Number(this.props.match.params.id))
    }
    if (this.props.events.allEvents.length === 0) this.props.getEvents()
    if (this.props.events.selectedEvent === null) this.props.getEventDetails(Number(this.props.match.params.id))
  }

  componentDidMount(){
    this.props.getTicketDetails(Number(this.props.match.params.ticketId))
  }
  
  onClick = () => {
    this.setState({editMode: this.state.editMode === false ? true : false})
  }

	render() {
		return (
      <div className="ticket-details-conteiner-page">
          <TicketDetails ticket={this.props.ticket} events={this.props.events} 
            eventId={this.props.match.params.id} user={this.props.authenticated}
            userId={this.props.userId} onClick={this.onClick} editMode={this.state.editMode}/>
          {
            this.props.authenticated && 
            <CreateCommentForm ticketId={this.props.match.params.ticketId} 
              userId={this.props.userId} createComment={this.props.createComment}
              eventId={this.props.match.params.id}/>
          }
      </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    events: state.events,
    ticket: state.ticket,
		authenticated: state.currentUser !== null,
		userId: state.currentUser && userId(state.currentUser.jwt),
		users: state.users,
	}
}

const mapDispatchToProps = {
    getUsers,
    getTicketDetails,
    getEvents,
    getEventDetails,
    createComment
	}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailsContainer)
