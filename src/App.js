import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/messageList';
import User from './components/User';



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAy3363QOkvnPiOLhjxHtYJsHkbzVdD_4U",
    authDomain: "bloc-chat-fe5c7.firebaseapp.com",
    databaseURL: "https://bloc-chat-fe5c7.firebaseio.com",
    projectId: "bloc-chat-fe5c7",
    storageBucket: "bloc-chat-fe5c7.appspot.com",
    messagingSenderId: "17869437316"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      activeRoomKey: "",
    };
  }

  handleActiveRoom(room) {
    this.setState({ activeRoom: room });
    this.setState({ activeRoomKey: room.key });
    console.log ("handleActiveRoom", room)
  }

  setUser(user){
      if (user === null) {
        return this.setState({ username: 'Guest' });
      } else {
        return this.setState({ username: user.displayName });
      }
    }

  render() {
    return (
      <div>
        <header>
        <h1>Bloc Chat</h1>
        <User firebase={firebase} setUser={this.setUser.bind(this)} username={this.state.username}/>
        </header>
        <aside>
          <RoomList firebase={firebase}
          activeRoom={this.handleActiveRoom.bind(this)}/>
        </aside>
        <div>
          <h2>{this.state.activeRoom.name}</h2>
        </div>
        <main>
          <MessageList firebase={firebase}
          activeRoomKey={this.state.activeRoomKey}/>
        </main>
      </div>
    );
  }
}

export default App;
