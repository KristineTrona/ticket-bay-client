import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'


export const LOAD_TICKET_DETAILS = 'LOAD_TICKET_DETAILS'
export const ADD_TICKET = 'ADD_TICKET'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_TICKET = 'EDIT_TICKET'

const loadTicketDetails = (ticket) => ({
  type: LOAD_TICKET_DETAILS,
  payload: ticket
})

const addTicket = (ticket) => ({
  type: ADD_TICKET,
  payload: ticket
})

const addComment= (comment) => ({
  type: ADD_COMMENT,
  payload: comment
})

const editTicket= (ticket) => ({
  type: EDIT_TICKET,
  payload: ticket
})

export const getTicketDetails = (ticketId) => (dispatch) => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(result => dispatch(loadTicketDetails(result.body)))
    .catch(err => console.error(err))
}

export const createTicket = (data) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(result => dispatch(addTicket(result.body)))
    .catch(err => console.error(err))
}

export const createComment= (data) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(result => dispatch(addComment(result.body)))
    .catch(err => console.error(err))
}


export const updateTicket = (ticketId, data) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(result => dispatch(editTicket(result.body)))
    .catch(err => console.error(err))
}