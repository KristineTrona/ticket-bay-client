import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import EventsPageContainer from './components/EventsPageContainer';
import Header from './components/Header'
import LoginPage from './components/login/LoginPage'
import SignUpPage from './components/signup/SignUpPage'
import LogoutPage from './components/login/LogoutPage'
import EventDetailsContainer from './components/EventDetailsContainer';
import TicketDetailsContainer from './components/TicketDetailsContainer'
import CreateEventForm from './components/CreateEventForm';
import CreateTicketForm from './components/CreateTicketForm'
import ThankYouPage from './components/ThankYouPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Route exact path = "/" component={EventsPageContainer}/>
        <Route exact path = "/events" component={EventsPageContainer}/>
        <Route exact path = "/login" component={LoginPage}/>
        <Route exact path = "/signup" component={SignUpPage}/>
        <Route exact path = "/logout" component={LogoutPage} />
        <Route exact path = "/events/:id" component={EventDetailsContainer} />
        <Route path = "/events/:id/tickets/:ticketId" component={TicketDetailsContainer} />
        <Route exact path = "/create-event" component={CreateEventForm}/>
        <Route exact path = "/events/:id/create-ticket" component={CreateTicketForm}/>
        <Route exact path = "/ticket-bought" component={ThankYouPage}/>
      </div>
    )
  }
}

export default App;
