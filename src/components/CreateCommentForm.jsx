import React from 'react'

export default class newComment extends React.Component{
  
  state = {
    text: "",
    ticketId: Number(this.props.ticketId),
    userId: Number(this.props.userId)
  }

  onChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState(
      {[name]: value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createComment(this.state)
    event.target.reset()
    
  }

  render(){
    return(
    <div className="add-comment-wrapper">
      <form id="create-comment" onSubmit={this.onSubmit}>
        <label className="add-new-comment" htmlFor="new-comment">Add a new comment: </label>
        <div className="new-comment-text-button">
          <textarea name="text" placeholder="Write here" maxLength="200" id="new-comment" form="create-comment" onChange={this.onChange}/>
          <button type="submit" className="submit-new-comment">Add</button>
        </div>
      </form>
    </div>
    )}       
} 