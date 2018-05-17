import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
	super(props);

	this.state = {
		messages: [{
		  username: "",
		  sentAt: "",
		  content: "",
		  roomId: "",
		}],
     newMessage: "",
	};

	this.messageRef = this.props.firebase.database().ref('Messages');
	this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
  }

  componentDidMount() {
  	this.messageRef.on('child_added', snapshot => {
    	const message = snapshot.val();
    	message.key = snapshot.key;
    	this.setState({ messages: this.state.messages.concat(message) })

  		});
      console.log(this.state.message)
  }

//Use the .push() method on your messages reference to add new messages, just as you did when
//creating new rooms in the RoomList component.

  createMessage(e) {
    e.preventDefault();
    const newMessage = this.state.newMessage;

    this.messageRef.push({
      username: this.props.username,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      content: newMessage,
      roomId: this.props.activeRoomKey,
    });

    this.setState({ newMessage: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.content) {return}
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }


  render() {
  	const activeRoomKey = this.props.activeRoomKey;

	return(
		<div>

    <ul>

    {this.state.messages.map( (message, index) => {
        if (activeRoomKey === "") {
            return null
          } else if (message.roomId == activeRoomKey) {
             return (
         <li className="message" key={index}>{message.username}: {message.content}</li>
                                 )
                           }
                       })}
                   </ul>

          <section>
            {activeRoomKey === "" ?
             null
              :
             <form onSubmit={ (e) => this.handleSubmit(e) }>
              <input type='text' name='newMessage'
              placeholder='Enter message here.'
              value={this.state.newMessage} 
              onChange={ (e) => this.handleChange(e) } />
              <input type='submit' value='Send' onClick={ (e) => this.createMessage(e) } />
              </form>
               }
            </section>

		</div>
	);
  }
}

export default MessageList;

//Create a MessageList component. Like the RoomList component, it should receive
// firebase as a prop and use the child_added event to add messages to the state.
// active room should be stored in the App component's state object so that the title of
//the active room changes every time you visit a different room.
