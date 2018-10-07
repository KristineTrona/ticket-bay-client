import { combineReducers } from 'redux'
import events from './events'
import login from './login'
import signup from './signup'
import users from './users'
import currentUser from './currentUser'
import ticket from './ticket'


export default combineReducers({
  events,
  ticket,
  users,
  currentUser,
  login,
  signup
})