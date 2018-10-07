import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'


export const LOAD_EVENTS = 'LOAD_EVENTS'
export const LOAD_EVENT_DETAILS = 'LOAD_EVENT_DETAILS'
export const ADD_EVENT = "ADD_EVENT"

const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  payload: events.events
})

const loadEventDetails = (event) => ({
  type: LOAD_EVENT_DETAILS,
  payload: event
})

const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event
})

export const getEvents = () => (dispatch) => {
  request
    .get(`${baseUrl}/events`)
    .then(result => dispatch(loadEvents(result.body)))
    .catch(err => console.error(err))
}

export const getEventDetails = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(result => dispatch(loadEventDetails(result.body)))
    .catch(err => console.error(err))
}

export const createEvent = (data) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}
