import React from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    rooms: [],
    newRoomName: "",
  };
  this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
         console.log(snapshot);
       });
     }
















export default RoomList;
