import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat </h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>

      </div>
    );
  }
}

export default App;
