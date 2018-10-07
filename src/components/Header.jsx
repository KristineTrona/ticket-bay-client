import React from 'react'
import {userId} from '../jwt'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import { Link} from 'react-router-dom'

function NavBar(props){

  const {history, user } = props

  return (
    <div className={user ? "header-with-user" : "header"}>
       <h3 className= "link-to-home">
        <Link to="/" style={{textDecoration: "none", color: "inherit"}}>Ticket-bay</Link>
      </h3>
        {
          user &&
          <div className = "account" color="inherit">
            <img className="account-icon" src="https://www.freeiconspng.com/uploads/customers-icon-3.png" alt="account-icon"/>
            <span className = "account-name" >{ user.username }</span>
          </div>
        }
        {
          !user &&
          <div className = "login-signup-buttons">
            <button className="login-button" color="inherit" onClick={() => history.push('/login')} >Login</button>
            <button className="signup-button" color="inherit" onClick={() => history.push('/signup')}> Sign Up</button>
          </div>    
        }
        {
          user &&
          <button className="logout-button" color="inherit" onClick={() => history.push('/logout')} >Logout</button>    
        }
    </div>)
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(NavBar)
)