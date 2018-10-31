import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import {getUsers} from '../actions/users'
import {connect} from 'react-redux'
import EventsPage from './EventsPage'
import {getEvents} from '../actions/events'

class EventsPageContainer extends PureComponent {

	componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers()
    }
  }
  
  componentDidMount(){
    if (this.props.events.allEvents.length === 0) this.props.getEvents()
  }
	
	render() {
		return (
			<EventsPage events={this.props.events.allEvents} user={this.props.authenticated}/>
		)}
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
    getEvents
	}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPageContainer)
