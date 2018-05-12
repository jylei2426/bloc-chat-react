import React, { Component } from 'react'

class MessageList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         messages: []
      };
      this.messagesRef = this.props.firebase.database().ref('messages');
   }

   componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
         //console.log(snapshot);
         const message = snapshot.val();
         message.key = snapshot.key;
         this.setState({ rooms: this.state.messages.concat(message) });
      });
   }

   render() {
          return (
        <section className='MessageList' >
          <table id="messages-sent">
            <thead>
              <tr>
                <th>{this.props.activeRoomName}</th>
              </tr>
            </thead>
            <colgroup>
              <col id ="username-column"/>
              <col id ="time-sent-column"/>
              <col id ="content-column"/>
            </colgroup>
            <tbody>
              { this.state.messages.map((message,index) =>
                message.roomId === this.props.activeRoom &&
                <tr className="message-data" key={index}>
                  <td className="username">{message.username}</td>
                  <td className="time-sent">{message.sentAt}</td>
                  <td className="content">{message.content}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </section>);
      }
  }

export default MessageList;
