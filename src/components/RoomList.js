import React, { Component } from 'react'

class RoomList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         rooms: []
      };
      this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
         //console.log(snapshot);
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat(room) });
      });
   }

   createRoom(e){
     e.preventDefault();
     // if (!this.state.newChatRoom) { return }
      // const newRoom = { roomName: this.state.newChatRoom }
     this.roomsRef.push({
     name: this.state.newRoomName
     });
     console.log('New Room Added!')
   }

   handleChange(e){
     this.setState({newRoomName: e.target.value})
   }


   render() {
      return (
          <section className='RoomList'>
            {
              this.state.rooms.map( (room, index) =>
               <ul className="chatroomlist" key={index} >
               <li onClick={() => this.props.selectRoom(room)}>{room.name}
          
               </li>
               </ul>)

           }
          <form onSubmit={ (e) => this.createRoom(e)}>
          <input type="text" value={ this.state.newChatRoom } onChange={ (e) => this.handleChange(e) } placeholder="Choose a Room Name" />
          <input type= "submit" value='Create Room' />
          </form>

         </section>
      )
   }
}

export default RoomList;
