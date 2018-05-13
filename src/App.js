import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/messageList';


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
          activeRoom: ""
          }
      }


      selectRoom(room) {
        console.log("this selected Room works")
          this.setState({
              activeRoom: room
          })
      }
      render() {
          return (
          <section>
            <div id='message-list'>
              <MessageList
                firebase={firebase}
                selectRoom={this.selectRoom.bind(this)}
                activeRoom={this.state.activeRoom.key}
                activeRoomName={this.state.activeRoom.name}
              />
            </div>
            <aside>
              <h1>Bloc Chat</h1>
              <section>
                <RoomList
                  firebase={firebase}
                  selectRoom={this.selectRoom.bind(this)}
                  activeRoom={this.state.activeRoom}
                />
              </section>
            </aside>

          </section>
          );
      }
  }

export default App;
