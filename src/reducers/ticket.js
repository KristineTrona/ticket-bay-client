import {LOAD_TICKET_DETAILS, ADD_COMMENT} from '../actions/ticket'

const reducer = (state = null, action = {}) => {
  switch(action.type){
    case LOAD_TICKET_DETAILS:
      return {...state = action.payload}
    case ADD_COMMENT:
      return {...state,
        comments:[...state.comments, action.payload]}
    default:
      return state
  }
}

export default reducer